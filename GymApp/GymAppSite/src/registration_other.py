from hashlib import sha512
from django.http import HttpRequest
from GymAppSite.models import UserLoginAndPassword
import pickle, datetime, os

def get_hash(password: str, salt: str):
    hash = sha512((password + sha512(salt.encode()).hexdigest()).encode())
    for i in range(100000):
        hash = sha512((hash.hexdigest() + sha512(salt.encode()).hexdigest()).encode())
    return hash.hexdigest()

class UserCreator():
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
    def get(self):
        return self.base
