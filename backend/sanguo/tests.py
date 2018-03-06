from django.test import TestCase
import requests
import json
# Create your tests here.
from sanguo.constants import BattleState
from sanguo.control import start_get_hero, start_match
from sanguo.models import CityOwnership
from sanguo.utils import manage_soldier
from sanguo.views import get_user_battle_info, get_user_hero_power

TEST_HOST = "127.0.0.1:8000"
PROD_HOST = "api.bitbuluo.com"


class TestDev(object):
    host = TEST_HOST
    user_list = []

    def test(self, step=0):
        if step == 0:
            print("开始获取英雄")
            start_get_hero()
        if step == 1:
            # 生成地址 申请英雄
            for i in range(42):
                address = "uaddr%s" % i
                session_id = ""
                resp = requests.post("http://%s/sanguo/login/" % self.host, data={"address": address})
                for a in resp.cookies:
                    if a.name == "sessionid":
                        session_id = a.value

                self.user_list.append({
                    "address": address,
                    "sessionid": session_id
                })
            # 获取英雄 前面41个可以获取英雄 其他人无法获取
            for i in range(len(self.user_list)):
                resp = json.loads(requests.post("http://%s/sanguo/get_my_hero/" % self.host,
                                                cookies={"sessionid": self.user_list[i]['sessionid']}).content)
                if i != len(self.user_list)-1:
                    assert resp['err_code'] == 0, "普通用户获取英雄 err_code: %s, err_msg: %s" % (resp['err_code'], resp['msg'])
                if i == len(self.user_list)-1:
                    assert resp['err_code'] == -1, "城市分配完毕, err_code: %s, err_msg: %s" % (resp['err_code'], resp['msg'])
            # 每个人获取1个城 3个武将
            # "state": get_current_battle_state(),
            #     "countdown": get_current_countdown_timestamp(),
            #     "address": address,
            #     "heroes": hero_list,
            #     "cities": city_list,
            #     "soldier": user_battle.soldier if user_battle else 0
            # }
            for i in range(len(self.user_list[:3])):
                resp = json.loads(requests.get("http://%s/sanguo/user_info/?address=%s" % (self.host, self.user_list[i]['address'])).content)
                assert resp['err_code'] == 0, "获取用户信息 err_code: %s, err_msg: %s" % (resp['err_code'], resp['msg'])
                assert resp['user_info']['state'] == BattleState.get_hero, "invalid state, %s" % resp['state']
                assert resp['user_info']['address'] == self.user_list[i]['address'], "invalid address"
                assert len(resp['user_info']['heroes']) == 3, "invalid hero number"
                assert len(resp['user_info']['cities']) == 1, "invalid city number"
                print(resp['user_info']['cities'])
        if step == 2:
            start_match()

        # 模拟战斗
        def test_attack(index, target_index, soldier=-1):
            """
            soldier为-1表示全军进攻
            """
            # uadd0发送1k兵力进攻uaddr2
            uaddr_cos = CityOwnership.objects.get(address=self.user_list[index]['address'])
            target_uaddr_cos = CityOwnership.objects.get(address=self.user_list[target_index]['address'])
            print("uaddr%s战力: %s, 城市: %s, 驻兵: %s" % (index, get_user_hero_power(self.user_list[index]['address']),
                                                    uaddr_cos.city_id, uaddr_cos.soldier))
            print("uaddr%s战力: %s, 城市: %s, 驻兵: %s" % (target_index, get_user_hero_power(self.user_list[target_index]['address']),
                                                    target_uaddr_cos.city_id, target_uaddr_cos.soldier))
            print("攻击=> 使用兵力: %s" % uaddr_cos.soldier if soldier <= 0 else soldier)
            resp = json.loads(requests.post("http://%s/sanguo/attack/" % self.host,
                                            cookies={"sessionid": self.user_list[index]['sessionid']},
                                            data={
                                                "city_id": uaddr_cos.city_id,
                                                "target_city_id": target_uaddr_cos.city_id,
                                                "attack_soldier_number": uaddr_cos.soldier if soldier <= 0 else soldier
                                            }).content)
            print("战斗结果", resp)
            uaddr_cos_list = CityOwnership.objects.filter(address=self.user_list[index]['address'])
            target_uaddr_cos_list = CityOwnership.objects.filter(address=self.user_list[target_index]['address'])
            for uaddr_cos in uaddr_cos_list:
                print("uaddr%s战力: %s, 城市: %s, 驻兵: %s" %
                      (index, get_user_hero_power(self.user_list[index]['address']),
                       uaddr_cos.city_id, uaddr_cos.soldier))
            for target_uaddr_cos in target_uaddr_cos_list:
                print("uaddr%s战力: %s, 城市: %s, 驻兵: %s" %
                  (target_index, get_user_hero_power(self.user_list[target_index]['address']),
                   target_uaddr_cos.city_id, target_uaddr_cos.soldier))
        if step == 3:
            test_attack(0, 2, 1000)
        if step == 4:
            test_attack(0, 2)
        if step == 5:
            test_attack(1, 2)
        if step == 6:
            for i in range(3):
                print("uaddr%s消息列表" % i)
                resp = json.loads(requests.get("http://%s/sanguo/battle_msg/" % self.host, cookies={"sessionid": self.user_list[0]['sessionid']}).content)
                print(resp)


class TestProd(TestDev):
    host = PROD_HOST


