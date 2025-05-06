from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class Room(models.Model):
    room_code = models.CharField(max_length=8, unique=True, validators=[MinLengthValidator])
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    