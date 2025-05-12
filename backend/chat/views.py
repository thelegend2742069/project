from .serializers import MessageSerializer
from .models import Message
from api.models import Room
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny


class MessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        room_code = self.kwargs.get('room_code')
        room = Room.objects.get(room_code=room_code)

        return Message.objects.filter(room=room).order_by('-timestamp')
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            room_code = self.kwargs.get('room_code')
            room = Room.objects.get(room_code=room_code)
            
            user = self.request.user if self.request.user.is_authenticated else None
            username = user.username if user else self.request.data.get('username')
             
            serializer.save(room=room, user=user, username=username)

        else:
            print(serializer.errors)
    
