from django.urls import path
from sanguo.views import hero_view, login_view, my_address_view, user_info_view, get_my_hero_view, map_info_view, \
    attack_view, debug_view, user_battle_msg_view

urlpatterns = [
    path('heroes/', hero_view),
    path('login/', login_view),
    path('my_address/', my_address_view),
    path('user_info/', user_info_view),
    path('get_my_hero/', get_my_hero_view),
    path('map_info/', map_info_view),
    path('attack/', attack_view),
    path('battle_msg/', user_battle_msg_view),
    path('debug/', debug_view),
]
