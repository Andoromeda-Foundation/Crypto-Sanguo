from django.urls import path
from sanguo.views import hero_view

urlpatterns = [
    path('heroes/', hero_view),
]
