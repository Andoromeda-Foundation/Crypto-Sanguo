import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from backend import settings
from sanguo.constants import TOKEN_EXPIRE_AFTER, BattleState
from sanguo.models import Heroes, HeroOwnership, CityOwnership, UserBattleInfo, Cities, BattleMessage
import json
import random
from django.core import serializers


def hero_view(requests):
    hero_list = serializers.serialize("json", Heroes.objects.all())
    return JsonResponse({"heroes": json.loads(hero_list)})


def add_battle_message(address, msg):
    battle_message = BattleMessage(address=address, message=msg)
    battle_message.save()


@csrf_exempt
def login_view(request):
    address = request.POST.get('address')
    if not address:
        return JsonResponse({"err_code": 401, "msg": "address为空"})
    request.session['uid'] = address
    request.session.set_expiry(TOKEN_EXPIRE_AFTER)

    # {
    #     int id;
    #     string sessionId;
    #     string name;
    #     string address;
    #     int soldier;
    #     int heroList[];
    #     int cityList[];
    # }
    player_info = {
        "session_id": request.session.session_key,
        "name": address,
        "address": address,
    }
    user_battle_info = get_user_battle_info(address)
    print("battle_info", user_battle_info)
    player_info.update(user_battle_info)
    map_info = get_map_info()
    add_battle_message(address, "恭喜你成功登陆! 您的地址是: %s" % address)
    return JsonResponse({"err_code": 0, "err_msg": "", "player_info": player_info, "map_info": map_info,
                         "msg_list": get_user_latest_n_message(address, 100, -1)})


def get_current_battle_state():
    current_state = settings.user_redis.get("battle_state")
    if not current_state:
        return BattleState.get_hero
    return int(current_state)


def get_current_countdown_timestamp():
    current_countdown_timestamp = settings.user_redis.get("state_countdown")
    if not current_countdown_timestamp:
        return -1
    return int(current_countdown_timestamp)


def get_user_battle_info(address):
    """
    int soldier;
    int heroList[];
    int cityList[];
    """
    heroes = HeroOwnership.objects.filter(address=address)
    cities = CityOwnership.objects.filter(address=address)
    try:
        user_battle = UserBattleInfo.objects.get(address=address)
    except Exception as err:
        user_battle = []
    hero_list = []
    city_list = []
    for hero in heroes:
        try:
            hero_list.append(model_to_dict(Heroes.objects.get(pk=hero.hero_id)))
        except Exception as err:
            print("err: %s, traceback: %s" % (err, traceback.format_exc()))
    for city in cities:
        try:
            city_list.append(model_to_dict(Cities.objects.get(pk=city.city_id)))
        except Exception as err:
            print("err: %s, traceback: %s" % (err, traceback.format_exc()))
    return {
        "state": get_current_battle_state(),
        "countdown": get_current_countdown_timestamp(),
        "address": address,
        "heroes": hero_list,
        "cities": city_list,
        "soldier": user_battle.soldier if user_battle else 0
    }


def get_map_info():
    cities = Cities.objects.all()
    city_list = [model_to_dict(city) for city in cities]
    for city in city_list:
        city_ownership = CityOwnership.objects.filter(city_id=city['id']).first()
        if city_ownership:
            city['owner_info'] = model_to_dict(city_ownership)
        else:
            city['owner_info'] = {}
    return city_list


def my_address_view(request):
    address = request.session.get("uid", "")
    if not address:
        return JsonResponse({"err_code": 401, "msg": "用户未登录 请重新登录"})

    return JsonResponse({"err_code": 0, "address": address})


def user_info_view(request):
    address = request.GET.get("address")
    battle_info = get_user_battle_info(address)
    return JsonResponse({"err_code": 0, "msg": "正常", "user_info": battle_info})


@csrf_exempt
def get_my_hero_view(request):
    if get_current_battle_state() != BattleState.get_hero:
        return JsonResponse({"err_code": -1, "msg": "当前不是获取英雄阶段"})
    address = request.session.get("uid", "")
    if not address:
        return JsonResponse({"err_code": 401, "msg": "用户未登录 请重新登录"})
    heroes = HeroOwnership.objects.filter(address=address)
    if heroes:
        return JsonResponse({"err_code": -1, "msg": "你已经有英雄了 无法重复获取"})
    cities = CityOwnership.objects.filter(address=address)
    if cities:
        return JsonResponse({"err_code": -1, "msg": "你已经有城市了 无法重复获取"})
    # TODO: wangangang 兵力直接部署到城市
    try:
        soldier = UserBattleInfo.objects.get(address=address)
        if soldier.soldier > 0:
            return JsonResponse({"err_code": -1, "msg": "你已经拥有兵力 无法重复获取"})
    except Exception as err:
        pass
    cities = Cities.objects.all()
    not_occupied_cities = [city for city in cities if not CityOwnership.objects.filter(city_id=city.pk).exists()]
    if not_occupied_cities:
        city = random.sample(not_occupied_cities, 1)[0]
        city_ownership = CityOwnership(address=address, city_id=city.pk, soldier=20000)
        city_ownership.save()
        add_battle_message(address, "恭喜你获得城市 %s , 兵力: %s, 防御: %s, 兵力回复速度: %s, 换手防御增长: %s" %
                           (city.name, 20000, city.init_defence, city.soldier_recover, city.defence_add))
    else:
        return JsonResponse({"err_code": -1, "msg": "本轮城市认领完, 请等待下轮", "countdown": get_current_countdown_timestamp()})
    heroes = list(Heroes.objects.all())
    heroes = random.sample(heroes, 3)
    for hero in heroes:
        hero_ownership = HeroOwnership(address=address, hero_id=hero.pk)
        hero_ownership.save()
        # leadership = models.IntegerField()  # 统帅
        # force = models.IntegerField()  # 武力
        # intelligence = models.IntegerField()  # 智力
        # politics = models.IntegerField()  # 政治
        # charm = models.IntegerField()  # 魅力
        # score = models.IntegerField()  # 综合
        add_battle_message(address, "恭喜你获得英雄 %s , 综合战力: %s, 其中: 统帅: %s, 武力: %s, 智力: %s, 政治: %s, 魅力: %s,"
                           % (hero.name, hero.score, hero.leadership, hero.force, hero.intelligence, hero.politics, hero.charm))
    user_battle_info = UserBattleInfo(address=address, soldier=20000)
    user_battle_info.save()
    return JsonResponse({"err_code": 0, "msg": "", "countdown": get_current_countdown_timestamp()})


def map_info_view(request):
    address = request.session.get('uid', '')
    player_info = {}
    if address:
        user_battle_info = get_user_battle_info(address)
        player_info.update(user_battle_info)
    map_info = get_map_info()
    return JsonResponse({"err_code": 0, "map_info": map_info, "player_info": player_info})


@csrf_exempt
def attack_view(request):
    """
    a1: 进攻方兵力和
    a2: 进攻方武将战斗力和
    d1: 防守方兵力和
    d2: 防守方武将战斗力和
    d3: 防守方所在城市的城防

    进攻方战斗力： a1 * a2 / (a2 + d2)
    防守方战斗力：(d1+d3) * d2 / (a2 + d2)
    根据战斗力比率 roll 点，如果进攻方获胜，防守方兵力 -1k，城防 -1k。
    防守方获胜，进攻方兵力 -1k。
    直到有一方兵力为 0，或者防守方城防为 0。

    胜:
        => 占领 增加兵力增长速度 城池实力增长 损失兵力
    负:
        => 损失兵力
    """
    address = request.session.get("uid", "")
    if not address:
        return JsonResponse({"err_code": 401, "msg": "用户尚未登录"})

    city_id = int(request.POST.get("city_id"))
    target_city_id = int(request.POST.get("target_city_id"))
    original_attack_soldier_number = attack_soldier_number = int(request.POST.get("soldier"))

    if get_current_battle_state() != BattleState.battle:
        return JsonResponse({"err_code": -1, "msg": "当前不是战斗阶段"})

    city = Cities.objects.filter(pk=city_id).first()
    if not city:
        return JsonResponse({"err_code": -1, "msg": "Invalid city_id"})

    city_ownership = CityOwnership.objects.filter(city_id=city_id).first()
    if not city_ownership or city_ownership.address != address:
        return JsonResponse({"err_code": -1, "msg": "不是进攻城市的owner!"})

    target_city = Cities.objects.filter(pk=target_city_id).first()
    if not target_city:
        return JsonResponse({"err_code": -1, "msg": "Invalid target_city_id"})

    # 判断对手合法性
    target_city_ownership = CityOwnership.objects.filter(city_id=target_city_id).first()
    if target_city_ownership and target_city_ownership.address == address:
        return JsonResponse({"err_code": -1, "msg": "自己不能进攻自己"})

    # 判断兵力
    if city_ownership.soldier < attack_soldier_number:
        return JsonResponse({"err_code": -1, "msg": "没有足够兵力"})

    # 出兵
    city_ownership.soldier -= attack_soldier_number
    city_ownership.save()

    # 破防
    if attack_soldier_number <= target_city.defence:
        add_battle_message(address, "兵力太少, 攻城失败, 损失兵力 %s" % attack_soldier_number)
        if target_city_ownership:
            add_battle_message(target_city_ownership.address,
                               "%s携带%s兵力进攻了你的城市, 您的城市毫发无伤!!" % (address, attack_soldier_number))
        return JsonResponse({"err_code": 0, "success": 0, "msg": "兵力太少, 破城失败"})
    attack_soldier_number -= target_city.defence

    # 白刃战
    target_city_ownership = CityOwnership.objects.filter(city_id=target_city_id).first()
    if not target_city_ownership:
        # 换所有权 更新城防 ownership
        new_city_ownership = CityOwnership(address=address, city_id=target_city_id, soldier=attack_soldier_number)
        new_city_ownership.save()
        city.defence += city.defence_add
        city.save()
        add_battle_message(address, "恭喜你获得新的城池 %s, 损失兵力: %s, 剩余兵力: %s, 防御: %s, 兵力回复速度: %s, 换手防御增长: %s" %
                           (city.name, target_city.defence, new_city_ownership.soldier, city.init_defence, city.soldier_recover, city.defence_add))
        return JsonResponse({"err_code": 0, "success": 1, "msg": "成功攻城!"})

    target_address = target_city_ownership.address
    user_power = get_user_hero_power(address)  # 武将战力
    target_power = get_user_hero_power(target_address)  # 武将战力
    if attack_soldier_number*user_power < target_city_ownership.soldier*target_power:
        # 攻城失败 更新兵力
        target_city_ownership.soldier -= attack_soldier_number*user_power/target_power
        target_city_ownership.save()
        add_battle_message(address, "攻城失败! 您损失兵力 %s 人, 对方损失兵力 %s 人" %
                           (original_attack_soldier_number, target_city_ownership.soldier))
        add_battle_message(target_address, "%s 携带 %s 兵力进攻了你的城市, 您损失兵力 %s 人" %
                           (address, original_attack_soldier_number, attack_soldier_number*user_power/target_power))
        return JsonResponse({"err_code": 0, "success": 0, "msg": "兵力太少,白刃战失败!"})
    else:
        # 攻城成功 更新城防 ownership
        target_city_ownership.delete()
        attack_soldier_number -= target_city_ownership.soldier*target_power/user_power
        new_city_ownership = CityOwnership(address=address, city_id=target_city_id, soldier=attack_soldier_number)
        new_city_ownership.save()
        target_city.defence += target_city.defence_add
        target_city.save()
        add_battle_message(address, "恭喜你获得新的城池 %s, 损失兵力: %s, 剩余兵力: %s, 防御: %s, 兵力回复速度: %s, 换手防御增长: %s" %
                           (city.name, original_attack_soldier_number - attack_soldier_number, attack_soldier_number,
                            city.defence, city.soldier_recover, city.defence_add))
        add_battle_message(target_address, "城池被夺! %s 携带 %s 兵力进攻了你的城市, 攻略成功!" %
                           (address, original_attack_soldier_number))
        return JsonResponse({"err_code": 0, "success": 1, "msg": "白刃战攻城成功!"})


def get_user_soldier(address):
    try:
        user_battle = UserBattleInfo.objects.get(address=address)
    except Exception as err:
        user_battle = []
    return int(user_battle.soldier) if user_battle else 0


def get_user_hero_power(address):
    """
    用户的战力为用户所有武将的战力和
    """
    hero_ownship_list = HeroOwnership.objects.filter(address=address)
    total_power = 0
    for hero_ownership in hero_ownship_list:
        hero = Heroes.objects.filter(id=hero_ownership.hero_id).first()
        total_power += int(hero.score)
    return total_power


@csrf_exempt
def debug_view(request):
    return JsonResponse(request.POST)


def user_battle_msg_view(request):
    address = request.session.get("uid", "")
    msg_id = int(request.GET.get('msg_id', -1))
    if not address:
        return JsonResponse({"err_code": 401, "msg": "address为空 需要重新登录"})
    msg_list = get_user_latest_n_message(address, 100, msg_id)
    return JsonResponse({"err_code": 0, "msg_list": msg_list})


def get_user_latest_n_message(address, number, msg_id):
    """
    基于msg_id获取用户最近的number条消息
    """
    msg_list = BattleMessage.objects.filter(address=address, pk__gt=msg_id).order_by('-ctime')[:number]
    msg_list = [{"msg": msg.message, "msg_id": msg.pk, "timestamp": msg.ctime.timestamp()} for msg in msg_list]
    return msg_list
