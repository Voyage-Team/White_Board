from django.urls import re_path
from board.consumers.multiuser.index import MultiUser

websocket_urlpatterns = [
    # re_path('',MultiUser.as_asgi()),
    re_path(r'ws/(?P<mode>\w+)/(?P<roomid>\w+)/$', MultiUser.as_asgi()),
]
