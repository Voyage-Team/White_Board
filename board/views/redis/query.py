from django.http import JsonResponse
from django.conf import settings
from django.core.cache import cache


def query(request):
    data = request.GET
    room_id = data.get('roomid')
    if not room_id:
        return JsonResponse({
            'result':"请输入房间号"
        })

    roomid = cache.has_key(room_id)
    if roomid:
        return JsonResponse({
            'result':"success"
        })

    return JsonResponse({
        'result':"fail"
    })
