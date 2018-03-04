import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from sanguo.constants import TOKEN_EXPIRE_AFTER
from sanguo.models import Heroes, HeroOwnership, CityOwnership, UserBattleInfo
import json
from django.core import serializers


def hero_view(requests):
    hero_list = serializers.serialize("json", Heroes.objects.all())
    return JsonResponse({"heroes": json.loads(hero_list)})


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
    player_info.update(user_battle_info)
    return JsonResponse({"err_code": 0, "err_msg": "", "player_info": player_info})


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
            city_list.append(model_to_dict(Heroes.objects.get(pk=city.city_id)))
        except Exception as err:
            print("err: %s, traceback: %s" % (err, traceback.format_exc()))
    return {
        "heroes": hero_list,
        "cities": city_list,
        "soldier": user_battle.soldier if user_battle else 0
    }


def my_address_view(request):
    address = request.session.get("uid", "")
    if not address:
        return {"err_code": 401, "msg": "用户未登录 请重新登录"}

    return JsonResponse({"err_code": 0, "address": address})


def user_info_view(request):
    address = request.GET.get("address")
    battle_info = get_user_battle_info(address)
    return JsonResponse(battle_info)
