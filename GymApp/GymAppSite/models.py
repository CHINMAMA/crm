from typing import Type
from django.db.models import CharField
from django.contrib.postgres.fields import ArrayField
from django.db import models

class UserLoginAndPassword(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    email = models.CharField(max_length=64, default="")
    role = models.CharField(max_length=10, default="")
    firstName = models.CharField(max_length=32, default="-")
    lastName = models.CharField(max_length=32, default="-")
    hash = models.CharField(max_length=1024, default="")
    salt = models.CharField(max_length=50, default="")
    token_hash = models.CharField(max_length=1024, default="")
    token_salt = models.CharField(max_length=50, default="")

class Gyms(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=32, default="")
    country = models.CharField(max_length=32, default="")
    city = models.CharField(max_length=32, default="")
    address = models.CharField(max_length=32, default="")

class Scedules(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    client = models.ForeignKey(UserLoginAndPassword, on_delete=models.CASCADE)
    begin = models.DateTimeField()
    end = models.DateTimeField()

class ScedulesSerializer():
    def __init__(self, client, begin, end):
        max_id = 1
        for obj in Scedules.objects.all():
            if obj.id > max_id:
                max_id = obj.id
        self.id = max_id + 1
        self.base = Scedules(
            client = client,
            begin = begin,
            end = end,
            id=self.id,
        )
        self.base.save()

class GymsSerializer():
    def __init__(self, name: str, country: str, city: str, address: str):
        max_id = 1
        for obj in Gyms.objects.all():
            if obj.id > max_id:
                max_id = obj.id
        self.id = max_id + 1
        self.base = Gyms(
            name = name,
            country = country,
            city = city,
            address = address,
            id=self.id,
        )
        self.base.save()


class UserSerializer():
    def __init__(self, login: str, role: str, hash, salt, firstName, lastName):
        max_id = 1
        for obj in UserLoginAndPassword.objects.all():
            if obj.id > max_id:
                max_id = obj.id
        self.id = max_id + 1
        self.base = UserLoginAndPassword(
            email=login,
            role=role,
            firstName=firstName,
            lastName=lastName,
            hash=hash,
            salt=salt,
            id=self.id,
            token_hash='',
            token_salt=''
        )
        self.base.save()