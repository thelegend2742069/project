from .models import Video
from rest_framework import serializers


class VideoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Video
        fields = ['title', 'path']

    
    def __init__(self, instance=None, data=..., **kwargs):
        super().__init__(instance, data, **kwargs)

        request = self.context.get('request')

        if request and request.method == 'POST':
            self.fields.pop('path')