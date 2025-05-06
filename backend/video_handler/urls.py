from django.urls import path
from .views import VideoListCreate, VideoDelete


urlpatterns = [
    path('video/', VideoListCreate.as_view(), name='video'),
    path('video/delete/<int:pk>/', VideoDelete.as_view(), name='video_delete'),
]