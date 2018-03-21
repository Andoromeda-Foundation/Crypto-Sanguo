import requests
import json

radar_url = "https://dappradar.com/api/dapps"
dap_url = "http://api.dapdap.io/dapps"

radar_apps = json.loads(requests.get(radar_url).content)
dap_apps = json.loads(requests.get(dap_url).content)['data']

radar_app_set = set(app['title'] for app in radar_apps)
dap_app_set = set(app['title'] for app in dap_apps)
radar_only_list = []
dap_only_list = []
common_app_list = []
for title in radar_app_set:
    if title in dap_app_set:
        common_app_list.append(title)
    else:
        radar_only_list.append(title)
for title in dap_app_set:
    if title not in radar_app_set:
        dap_only_list.append(title)
dap_dict = {app['title']: app for app in dap_apps}
radar_dict = {app['title']: app for app in radar_apps}
print("rader has %s apps" % len(radar_apps))
print("dap has %s apps" % len(dap_apps))
print("共同的: %s, radar_only: %s, dap_only: %s" % (len(common_app_list), len(radar_only_list), len(dap_only_list)))
print("\n***radar only***")
print(radar_only_list)
print("\n***dap only***")
print(dap_only_list)

dap_compare_items = ["balance", "volumeLastDay", "volumeLastWeek", "txLastDay", "txLastWeek", "dauLastDay"]
radar_compare_items = ["balance", "volumeLastDay", "volumeLastWeek", "txLastDay", "txLastWeek", "dauLastDay"]

# 计算common_title的属性
alert_percent = 10
total_check_point = len(common_app_list) * len(dap_compare_items)
bad_check_point = 0
bad_check_list = []
big_count = 0
for title in common_app_list:
    for index in range(len(dap_compare_items)):
        item1 = float(dap_dict[title][dap_compare_items[index]])
        item2 = float(radar_dict[title][radar_compare_items[index]])
        if item1 == item2 == 0:
            continue
        if item2 > item1:
            big_count += 1
        diff_percent = abs(item1-item2)*100.0/max(item1, item2)
        if diff_percent > 10 and item1 < item2:
            bad_check_list.append({"title": title, "prop": dap_compare_items[index], "dap_value": item1, "radar_value": item2, "diff_percent": int(diff_percent)})
            bad_check_point += 1

print("radar_big", big_count)
print("共有check_point: %s, 不一致check_point: %s" % (total_check_point, bad_check_point))
print("详情:")
for check_info in bad_check_list:
    print("%s => %s 误差%s%%(dap: %s, radar: %s)" % (check_info['title'], check_info['prop'], check_info['diff_percent'], check_info['dap_value'], check_info['radar_value']))


