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

        # id = media_data['id']
        # title = media_data['title']
        path = media_data['path']

        print(f'received source: {path}')


        await self.channel_layer.group_send(
            self.ws_code, 
            {
                "type": 'media.message',
                "path": path,
            }
        )

        print('media source sent to everyone')

        
    
    async def media_message(self, media_data):
        print('hiiiiiiiiiiiiiiii')
        path = media_data['path']


        await self.send(text_data=json.dumps(
            {
                "path": path,
            },
            default=str
        ))

        print("message sent to self")