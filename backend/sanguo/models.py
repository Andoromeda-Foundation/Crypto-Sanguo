from django.db import models

EnabledChoices = [(0, u'停用'), (1, u'启用')]


class Heroes(models.Model):
    name = models.CharField(max_length=30)
    leadership = models.IntegerField()  # 统帅
    force = models.IntegerField()  # 武力
    intelligence = models.IntegerField()  # 智力
    politics = models.IntegerField()  # 政治
    charm = models.IntegerField()  # 魅力
    score = models.IntegerField()  # 综合
    image = models.CharField(max_length=100, default="")  # 头像
    introduce = models.TextField(default="")  # 生平
    is_enabled = models.IntegerField(default=1, choices=EnabledChoices)

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'heroes'
        verbose_name_plural = u'英雄'

    def __str__(self):
        return "Hero with name=%s, 统帅=%s, 武力=%s, 智力=%s, 政治=%s, 魅力=%s, 综合=%s, 头像=%s, 生平=%s, 是否开启=%s" \
               % (self.name, self.leadership, self.force, self.intelligence, self.politics, self.charm, self.score,
                  self.image, self.introduce, self.is_enabled)


class Cities(models.Model):
    name = models.CharField(max_length=30)
    init_defence = models.IntegerField(default=1000)
    defence = models.IntegerField()  # 防御力
    defence_add = models.IntegerField()  # 每次转手防御力增长
    soldier_recover = models.IntegerField()  # 单位时间兵力增长

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'cities'
        verbose_name_plural = u'英雄'

    def __str__(self):
        return "Cities with name=%s, 防御=%s, 防御增长=%s, 单位时间兵力增长=%s" \
               % (self.name, self.defence, self.defence_add, self.soldier_recover)


class UserEx(models.Model):
    address = models.CharField(max_length=100)
    image_url = models.CharField(max_length=300)
    nickname = models.CharField(max_length=100)
    slogan = models.CharField(max_length=300)

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'user'
        verbose_name_plural = u'用户'

    def __str__(self):
        return "User with address=%s, image_url=%s, nickname=%s, slogan=%s" \
               % (self.address, self.image_url, self.nickname, self.slogan)


# 某个用户拥有某个英雄 => 在比赛开始时清空 => 比如每1个小时清空一次
class HeroOwnership(models.Model):
    address = models.CharField(max_length=100)
    hero_id = models.IntegerField()  # 某个用户当前拥有某个hero

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'hero_ownership'
        verbose_name_plural = u'用户'

    def __str__(self):
        return "HeroOwnership with address=%s, hero_id=%s" \
               % (self.address, self.hero_id)


# 某个用户拥有某个城市
class CityOwnership(models.Model):
    address = models.CharField(max_length=100)
    city_id = models.IntegerField()
    soldier = models.IntegerField(default=0)  # 城市兵力

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'city_ownership'
        verbose_name_plural = u'用户'

    def __str__(self):
        return "CityOwnership with address=%s, city_id=%s" \
               % (self.address, self.city_id)


# 某个比赛
class UserBattleInfo(models.Model):
    address = models.CharField(max_length=100)
    soldier = models.IntegerField()  # 兵力

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'user_battle_info'
        verbose_name_plural = u'用户'

    def __str__(self):
        return "UserBattleInfo with address=%s, soldier=%s" \
               % (self.address, self.soldier)


class BattleMessage(models.Model):
    address = models.CharField(max_length=100)  # 如果address为all 表示是
    message = models.CharField(max_length=1000)

    mtime = models.DateTimeField(blank=True,  auto_now_add=True)
    ctime = models.DateTimeField(blank=True, auto_now_add=True)

    class Meta:
        app_label = 'sanguo'
        db_table = 'battle_message'
        verbose_name_plural = u'消息'

    def __str__(self):
        return "UserBattleInfo with address=%s, message=%s" \
               % (self.address, self.message)
