# chat/consumers.py
import json
# from asgiref.sync import async_to_sync
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
        self.room_group_name = 'board_%s' % roomid
        print("roomid:" + roomid + " mode:" + self.mode)
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print("成功连接")
        await self.accept()
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

    async def paint_regular_graphics(self, data):
        print("发送规则图形")
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"send_message",
                'event':"regular_graphics",
                'style':data['style'],
                'startX':data['startX'],
                'startY':data['startY'],
                'endX':data['endX'],
                'endY':data['endY'],
            }
        )

    async def paint_bezier_curve(self, data):
        print("发送贝塞尔曲线")
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"send_message",
                'event':"bezier_curve",
                'style':data['style'],
                'start':data['start'],
                'control':data['control'],
                'end':data['end'],
            }
        )

    # Receive message from WebSocket
    async def receive(self, text_data:str) -> None:
        data = json.loads(text_data)
        event = data['event']
        print(data)
        if event == 'regular_graphics':
            await self.paint_regular_graphics(data)
        elif event == 'bezier_curve':
            await self.paint_bezier_curve(data)

        await self.channel_layer.group_send(
        self.room_group_name, {
            'type': 'chat.message',  # 必须在MsgConsumer类中定义chat_message
            'message': data
        })

    # Receive message from room group
    async def send_message(self, data):

        # Send message to WebSocket
        await self.send(text_data=json.dumps(data))

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(
            text_data=json.dumps({
            'message': message
        }))
