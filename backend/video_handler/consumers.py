from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MediaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("opening media websocket connection")
        self.room_code = self.scope["url_route"]["kwargs"]["room_code"] 
        self.ws_code = self.room_code + '_media'
        await self.channel_layer.group_add(self.ws_code, self.channel_name)
        await self.accept()
        print("media websocket connection established")


    async def disconnect(self, code):
        self.channel_layer.group_discard(self.ws_code, self.channel_name)
    

    async def receive(self, text_data):
        media_data = json.loads(text_data)

        method = media_data['method']
        path = media_data['path']
        timestamp = media_data['timestamp']
        playback_rate = media_data['playback_rate']

        print("received media update")
        print(media_data)

        await self.channel_layer.group_send(
            self.ws_code, 
            {
                "type": 'media.message',
                'method': method,
                "path": path,
                'timestamp': timestamp,
                'playback_rate': playback_rate,
            }
        )

        print('media update sent to everyone')

        
    
    async def media_message(self, media_data):
        
        method = media_data['method']
        path = media_data['path']
        timestamp = media_data['timestamp']
        playback_rate = media_data['playback_rate']

        await self.send(text_data=json.dumps(
            {
                'method': method,
                "path": path,
                'timestamp': timestamp,
                'playback_rate': playback_rate,
            },
            default=str
        ))

        print("media data sent to self")