from django.urls import re_path
from .consumers import MediaConsumer


websocket_urlpatterns = [
    re_path(r'ws/media/room/(?P<room_code>[a-zA-Z]+)/$', MediaConsumer.as_asgi())
]