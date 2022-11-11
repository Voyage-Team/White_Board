# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.cache import cache

class MultiUser(WebsocketConsumer):
    def connect(self):
        self.roomid = self.scope['url_route']['kwargs']['roomid']
        self.mode = self.scope['url_route']['kwargs']['mode']
        self.room_group_name = 'board_%s' % self.roomid
        print("roomid:" + self.roomid + " mode:" + self.mode)
        # self.room_group_name = 'board_11'
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        print("成功连接")
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data:str) -> None:
        print(text_data)
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json['creator']
        # json_str = json.dumps(python2json)
        # message=JSON.stringify(text_data_json)
        print("----")
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                'type': 'chat.message',  # 必须在MsgConsumer类中定义chat_message
                'message': text_data_json
            })


    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))