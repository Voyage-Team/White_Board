# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache

class MultiUser(WebsocketConsumer):
    def connect(self):
        #self.roomid = self.scope['url_route']['kwargs']['roomid']
        #self.mode = self.scope['url_route']['kwargs']['mode']
        #self.room_group_name = 'board_%s' % self.roomid
        #print("roomid:" + self.roomid + " mode:" + self.mode)
        # self.room_group_name = 'board_11'
        # # Join room group
        # async_to_sync(self.channel_layer.group_add)(
        #     self.room_group_name,
        #     self.channel_name
        # )
        print("成功连接")
        self.accept()
        self.send(text_data=json.dumps({
            'message': message
        }))

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))