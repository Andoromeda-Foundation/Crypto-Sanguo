TOKEN_EXPIRE_AFTER = 86400 * 5


class BattleState(object):
    get_hero = 0  # 获得英雄阶段
    battle = 1  # 比赛阶段
    give_prize = 2  # 发放奖品阶段


GET_HERO_INTERVAL = 600
BATTLE_INTERVAL = 3600  # 比赛时间1h
PRICE_INTERVAL = 1200

