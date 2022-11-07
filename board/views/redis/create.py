from django.http import JsonResponse
from django.conf import settings
from django.core.cache import cache
import random

def create(request):
    tmp = random.randint(1, 100)
    
    while cache.has_key(tmp):
        tmp = random.randint(1, 100)

    cache.set(tmp, [], 3600)

    return JsonResponse({
        'result':"success",
        'roomid':tmp
    })
