from django.urls import path
from sanguo.views import new_hero_view

urlpatterns = [
    path('new_hero/', new_hero_view),
]
