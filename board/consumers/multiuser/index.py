# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
import random
mes = []
inf = {"0":mes}
class MultiUser(AsyncWebsocketConsumer):
    async def connect(self):
        self.roomid = self.scope['url_route']['kwargs']['roomid']
        self.mode = self.scope['url_route']['kwargs']['mode']
        roomid = int(self.roomid)
        mode = str(self.mode)
        print(mode)
        connect = int(0)
        if cache.has_key(roomid) == False and mode =="join" :
            connect = 1
        if roomid == 0:
            roomid = random.randint(1, 100)
            while cache.has_key(roomid):
                roomid = random.randint(1, 100)
            cache.set(roomid, [], 3600)
        self.room_group_name = 'board_%s' % roomid
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print("成功连接")
        await self.accept()
        # 需要客户端写接收函数，显示房间不存在
        if connect == 1:
            await self.send(
                text_data=json.dumps({
                'roomid': "-1"
            }))
        flag = int(0)
        if flag == 0:
            flag = 1
            await self.send(
                text_data=json.dumps({
                'roomid': roomid
            }))
        
        inf = {self.roomid:mes}
        for i in inf[self.roomid]:
            print(i)
            await self.send(
                text_data=json.dumps({
                    # 'type': 'chat.message',  # 必须在MsgConsumer类中定义chat_message
                    'message': i
                }))
        
        

    async def disconnect(self, close_code):
        # Leave room group
        
        del inf[self.roomid]
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data:str) -> None:
        print(text_data)
        text_data_json = json.loads(text_data)
        print(text_data_json)
        roomid = text_data_json['roomid']
        
        # inf[self.roomid].append(text_data_json) #需要客户端传递一个roomid
        inf[roomid].append(text_data_json)
        
        # json_str = json.dumps(python2json)
        # message=JSON.stringify(text_data_json)
        # print("----")
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
