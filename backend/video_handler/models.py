from django.db import models
from api.models import Room, User
import shutil

class Video(models.Model):
    title = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)