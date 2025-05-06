from django.db import models
from api.models import Room, User
import shutil

class Video(models.Model):
    title = models.CharField(max_length=50)
    path = models.CharField(max_length=200)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    date_uploaded = models.DateTimeField(auto_now_add=True)

    
    def delete(self, *args, **kwargs):
        video_dir = "/".join(self.path.split('/')[:-1])
        
        try:
            shutil.rmtree(video_dir)
        except FileNotFoundError:
            print("file/folder does not exist at ", video_dir)

        return super(Video, self).delete(*args, **kwargs)