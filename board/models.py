from django.db import models

# Create your models here.
class Question():
    def __init__(self,a:int,b:int) -> None:
        self.a=a
        self.b=b
    def ret(self) -> int:
        return self.a+self.b
