from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from sanguo.constants import TOKEN_EXPIRE_AFTER
from sanguo.models import Heroes
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
    return JsonResponse({"err_code": 0, "err_msg": ""})


def my_address_view(request):
    address = request.session.get("uid", "")
    if not address:
        return {"err_code": 401, "msg": "用户未登录 请重新登录"}

    return JsonResponse({"err_code": 0, "address": address})
