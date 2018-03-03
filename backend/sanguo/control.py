# 游戏控制类函数

import time
from backend import settings


# 获取武将阶段
from sanguo.constants import BattleState, GET_HERO_INTERVAL, BATTLE_INTERVAL
from sanguo.models import HeroOwnership, CityOwnership, UserBattleInfo


def start_get_hero():
    # 删除所有比赛信息
    HeroOwnership.objects.all().delete()
    CityOwnership.objects.all().delete()
    UserBattleInfo.objects.all().delete()
    # 将比赛状态设为get_hero 并记录时间戳
    settings.user_redis.set("battle_state", BattleState.get_hero)
    settings.user_redis.set("finish_get_hero_timestamp", time.time() + GET_HERO_INTERVAL)  # 10分钟的比赛时间


# 比赛阶段
def start_match():
    # 开始比赛
    settings.user_redis.set("battle_state", BattleState.battle)
    settings.user_redis.set("finish_get_hero_timestamp", time.time() + BATTLE_INTERVAL)  # 10分钟的比赛时间


def clear_data():
    pass
