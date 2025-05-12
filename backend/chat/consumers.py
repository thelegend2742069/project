from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .models import Message
from api.models import Room

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope["url_route"]["kwargs"]["room_code"] 
        self.ws_code = self.room_code + "_chat"
        await self.channel_layer.group_add(self.ws_code, self.channel_name)
        await self.accept()

    
    async def disconnect(self, code):
        self.channel_layer.group_discard(self.ws_code, self.channel_name)
    

    async def receive(self, text_data):
        message_data = json.loads(text_data)

        username = message_data['username']
        text = message_data['text']

        await self.save_message(username, text)

        await self.channel_layer.group_send(
            self.ws_code, 
            {
                "type": 'chat_message',
                "username": username,
                "text": text
            }
        )

        print('message sent to everyone')

        
    
    async def chat_message(self, message_data):
        username = message_data['username']
        text = message_data['text']

        await self.send(text_data=json.dumps(
            {
            "username": username,
            "text": text
            },
            default=str
        ))


    @sync_to_async
    def save_message(self, username, text):
        room = Room.objects.get(room_code=self.room_code)
        Message.objects.create(username=username, text=text, room=room)
        print("message saved to database")