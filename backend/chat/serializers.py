from django.core import serializers
from .models import Message

class MessageSerializer(serializers.Serializer):

    class Meta:
        model = Message
        fields = ['text', 'room_code', 'username', 'user', 'timestamp']
    