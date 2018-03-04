from django.http import JsonResponse
from sanguo.constants import TOKEN_EXPIRE_AFTER
from sanguo.models import Heroes
import json
from django.core import serializers


def hero_view(requests):
    hero_list = serializers.serialize("json", Heroes.objects.all())
    return JsonResponse({"heroes": json.loads(hero_list)})


def login_view(request):
    address = request.POST.get('address')
    request.session['uid'] = address
    request.session.set_expiry(TOKEN_EXPIRE_AFTER)
    return {"err_code": 0, "err_msg": ""}


def all_heroes(request):
    address = request.session.get("uid", "")
    if not address:
        return {"err_code": 401, "msg": "用户未登录 请重新登录"}

    heroes = Heroes.objects.filter(is_enabled=1)
    return heroes
