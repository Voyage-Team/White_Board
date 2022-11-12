from django.urls import path,include
from board.views.redis.query import query
from board.views.redis.create import create

urlpatterns = [
    path('query/',query,name="redis_query"),
    path('create/',create, name="redis_create"),
]
