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