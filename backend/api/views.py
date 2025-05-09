from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Room
from .serializers import UserSerializer, RoomSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    

class RoomListCreate(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    
    def get_queryset(self):
        room_code = self.request.query_params.get('room_code')
        
        if room_code:
            return Room.objects.filter(room_code=room_code) 
        else:
            return Room.objects.all()
    

    def perform_create(self, serializer):
        if serializer.is_valid():
            user = self.request.user
            serializer.save(host=user)
        else:
            print(serializer.errors)
        

class RoomDelete(generics.DestroyAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'room_code'
    
    def get_queryset(self):
        user = self.request.user
        return Room.objects.filter(host=user)
    
