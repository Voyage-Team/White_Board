from django.urls import path,include

from board.views.index import index

urlpatterns = [
        path('', index, name='index'),
        path('redis/', include("board.urls.redis.index")),
]
