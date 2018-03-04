from django.urls import path
from sanguo.views import hero_view, login_view

urlpatterns = [
    path('heroes/', hero_view),
    path('login/', login_view),
]
