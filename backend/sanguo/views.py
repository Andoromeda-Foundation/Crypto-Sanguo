from django.http import JsonResponse
from sanguo.constants import TOKEN_EXPIRE_AFTER
from sanguo.models import Heroes


def new_hero_view(requests):
    return JsonResponse({"heroes": ["test"]})


def login_view(request):
    address = request.POST.get('address')
    request.session['uid'] = address
    request.session.set_expiry(TOKEN_EXPIRE_AFTER)


def all_heroes(request):
    address = request.session.get("uid", "")
    if not address:
        return {"err_code": 401, "msg": "用户未登录 请重新登录"}

    heroes = Heroes.objects.filter(is_enabled=1)
    return heroes
