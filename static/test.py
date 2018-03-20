import json

with open("name_to_id.json", "r") as f:
    name_to_id_dict = json.load(f)

with open("heroes.json", "r") as f:
    hero_dict = json.load(f)

print(len(name_to_id_dict))
gc = 0
no_map_name_list = []

# 拿到所有的heroes 去掉所有不存在及重复的hero
new_hero_name_set = set()
new_hero_list = []

for hid, hero_info in hero_dict.items():
    if hero_info['姓名'] not in new_hero_name_set and hero_info['姓名'] in name_to_id_dict:
        gc += 1
        new_hero_list.append(hero_info)
    else:
        no_map_name_list.append(hero_info['姓名'])

# 对于所有的hero_list 更新图片链接
for hero in new_hero_list:
    hero["image_name"] = "%s-1.jpg" % name_to_id_dict[hero['姓名']]

result = {}
print("共有英雄: %s, 有图的: %s, 没图的%s" % (len(hero_dict), len(new_hero_list), len(no_map_name_list)))
new_hero_list = sorted(new_hero_list, key=lambda x:x["综合"], reverse=True)
for index, hero_info in enumerate(new_hero_list):
    hero_info['id'] = index+1
    result[str(index+1)] = hero_info
print(new_hero_list[0])

result_str = json.dumps(result, indent=2)
result_str = result_str.encode("utf-8").decode('unicode_escape')

with open('new_hero.json', 'w', encoding='gbk') as outfile:
    outfile.write(result_str)
# data = json.load(open('data.json'))
