from .serializers import VideoSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Video
from api.models import Room
from .utils import store_as_hls


class VideoListCreate(ListCreateAPIView):
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        room_code = self.kwargs.get("room_code")
        room = Room.objects.get(room_code=room_code)

        return Video.objects.filter(room=room)
    
    def perform_create(self, serializer):
        
        if serializer.is_valid():    
            file = self.request.FILES['video']

            room_code = self.kwargs.get("room_code")
            room = Room.objects.get(room_code=room_code)

            user = self.request.user
            path = store_as_hls(file.temporary_file_path(), title=self.request.data['title'], username=user.username)

            serializer.save(room=room, uploader=user, path=path)
        
        else:
            print(serializer.errors)
    
    

