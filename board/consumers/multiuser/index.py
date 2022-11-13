# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
import random
class MultiUser(AsyncWebsocketConsumer):
    async def connect(self):
        self.roomid = self.scope['url_route']['kwargs']['roomid']
        self.mode = self.scope['url_route']['kwargs']['mode']
        roomid = int(self.roomid)
        if roomid == 0:
            roomid = random.randint(2, 100)
            while cache.has_key(roomid):
                roomid = random.randint(2, 100)
            cache.set(roomid, [], 3600)
            # roomid = tmp
        self.room_group_name = 'board_%s' % roomid
        # print("roomid:" + roomid + " mode:" + self.mode)
        # self.room_group_name = 'board_11'
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print("成功连接")
        await self.accept()
        flag = int(0)
        if flag == 0:
            flag = 1
            await self.send(
                text_data=json.dumps({
                'roomid': roomid
            }))
        
        

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data:str) -> None:
        print(text_data)
        text_data_json = json.loads(text_data)
        print(text_data_json)
        # message = text_data_json['data']['color']
        # message = text_data_json['opt']
        # json_str = json.dumps(python2json)
        # message=JSON.stringify(text_data_json)
        print("----")
        await self.channel_layer.group_send(
            self.room_group_name, {
                'type': 'chat.message',  # 必须在MsgConsumer类中定义chat_message
                'message': text_data_json
            })


    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps({
            'message': message
        }))