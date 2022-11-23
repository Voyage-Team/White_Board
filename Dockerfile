FROM python:3.8-alpine

WORKDIR /usr/src/app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add build-base libffi-dev 

RUN apk add redis

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt -i https://pypi.mirrors.ustc.edu.cn/simple
COPY . .
CMD daphne -b 0.0.0.0 -p 5015 White_Board.asgi:application & \
 redis-server & \
 python3 manage.py runserver 0.0.0.0:8000
