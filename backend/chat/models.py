from django.db import models
from django.contrib.auth.models import User
from api.models import Room


class Message(models.Model):
    text = models.CharField(max_length=100)
    room_code = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
