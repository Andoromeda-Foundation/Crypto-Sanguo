import json
import time
import traceback
from sanguo.constants import BattleState
from sanguo.models import Heroes, Cities, CityOwnership
from sanguo.views import get_current_battle_state


def insert_hero_data():
    data = json.load(open('backend/data/heroes.json'))
    # name = models.CharField(max_length=30)
    # leadership = models.IntegerField()  # 统御
    # force = models.IntegerField()  # 武力
    # intelligence = models.IntegerField()  # 智力
    # politics = models.IntegerField()  # 政治
    # charm = models.IntegerField()  # 魅力
    # score = models.IntegerField()  # 综合
    # is_enabled = models.IntegerField(default=1, choices=EnabledChoices)
    for key, info in data.items():
        try:
            hero_info = {
                "name": info['姓名'],
                "leadership": int(info['统御']),
                "force": int(info['武力']),
                "intelligence": int(info['智力']),
                "politics": int(info['政治']),
                "charm": int(info['魅力']),
                "score": int(info['综合']),
                "image": info['image_name'],
                "introduce": info.get('生平', '')
            }
        except Exception as err:
            print("err: %s, callstack: %s, info: %s" % (err, traceback.format_exc(), info))
        if Heroes.objects.filter(name=hero_info['name']):
            print("%s exist, try next" % hero_info['name'])
            continue
        hero = Heroes(name=hero_info['name'],
                      leadership=hero_info['leadership'],
                      force=hero_info['force'],
                      intelligence=hero_info['intelligence'],
                      politics=hero_info['politics'],
                      charm=hero_info['charm'],
                      score=hero_info['score'],
                      image=hero_info['image'],
                      introduce=hero_info['introduce'],
                      is_enabled=1)
        hero.save()


def insert_city_data():
    data = json.load(open('backend/data/cities.json'))
    for city_name in data:
        try:
            # name = models.CharField(max_length=30)
            # defence = models.IntegerField()  # 防御力
            # defence_add = models.IntegerField()  # 每次转手防御力增长
            # soldier_recover = models.IntegerField()  # 单位时间兵力增长
            city_info = {
                "name": city_name,
                "defence": 1000,
                "defence_add": 1000,
                "soldier_recover": 1000,
            }
        except Exception as err:
            print("err: %s, callstack: %s, info: %s" % (err, traceback.format_exc(), city_name))
        if Cities.objects.filter(name=city_info['name']):
            print("%s exist, try next" % city_info['name'])
            continue
        city = Cities(name=city_info['name'],
                      defence=city_info['defence'],
                      defence_add=city_info['defence_add'],
                      soldier_recover=city_info['soldier_recover'])
        city.save()


def manage_soldier(times=-1):
    """
    支持两种模式:
        调试模式 times为正数 表示经过多少轮兵力增长
        游戏模式: 每10秒进行一轮兵力增长
    """
    current_times = 0
    while True:
        if times <= 0:
            time.sleep(10)
        if current_times == times:
            return
        if get_current_battle_state() == BattleState.battle:
            # 兵力增长
            print("进行一轮兵力增长")
            city_ownership_list = CityOwnership.objects.all()
            for city_ownership in city_ownership_list:
                city_id = city_ownership.city_id
                city = Cities.objects.filter(id=city_id).first()
                if not city:
                    print("Bug! 城市不存在")
                    continue
                city_ownership.soldier += city.soldier_recover
                city_ownership.save()
        else:
            print("当前非战斗状态")
        current_times += 1
