import json
from sanguo.models import Heroes


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
                "score": int(info['综合'])
            }
        except:
            print(info)
        if Heroes.objects.filter(name=hero_info['name']):
            print("%s exist, try next" % hero_info['name'])
        hero = Heroes(name=hero_info['name'],
                      leadership=hero_info['leadership'],
                      force=hero_info['force'],
                      intelligence=hero_info['intelligence'],
                      politics=hero_info['politics'],
                      charm=hero_info['charm'],
                      score=hero_info['score'],
                      is_enabled=1)
        hero.save()
