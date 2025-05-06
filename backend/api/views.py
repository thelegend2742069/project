from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Room
from .serializers import UserSerializer, RoomSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    


class RoomList(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]


class RoomCreate(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            user = self.request.user
            serializer.save(host=user)
        else:
            print(serializer.errors)



class RoomListCreate(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    
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
    
