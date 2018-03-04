from django.urls import path
from sanguo.views import hero_view, login_view, my_address_view, user_info_view

urlpatterns = [
    path('heroes/', hero_view),
    path('login/', login_view),
    path('my_address/', my_address_view),
    path('user_info/', user_info_view)
]
