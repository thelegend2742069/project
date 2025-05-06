from django.urls import path
from .views import VideoListCreate


urlpatterns = [
    path('video/', VideoListCreate.as_view(), name='video')
]