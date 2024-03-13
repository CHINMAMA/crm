from django.views.decorators.csrf import csrf_exempt
from GymAppSite.models import UserLoginAndPassword
from GymAppSite.src.registration_other import get_hash, UserCreator
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django import forms
import string
import random

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


def login_required(view):
    def wrapper(request):
        if 'login_cookie' in request.data.keys() or 'auth_token' in request.data.keys():
            login = request.data['login_cookie']
            auth_token = request.data['auth_token']
            access = False
            for obj in UserLoginAndPassword.objects.all():
                print(get_hash(auth_token, obj.token_salt))
                if obj.email == login and get_hash(auth_token, obj.token_salt) == obj.token_hash:
                    print('hehe')
                    access = True
            if access:
                return view(request)
        return Response({
            'auth': '0',
        })
    return wrapper


def admin_required(view):
    def wrapper(request):
        if 'login_cookie' in request.data.keys() or 'auth_token' in request.data.keys():
            login = request.data['login_cookie']
            auth_token = request.data['auth_token']
            access = False
            for obj in UserLoginAndPassword.objects.all():
                if obj.email == login and obj.role == 'GYM OWNER' and get_hash(auth_token, obj.token_salt) == obj.token_hash:
                    access = True
            if access:
                return view(request)
        return Response({
            'auth': '0',
        })
    return wrapper


def logout_page(request):
    if 'login_cookie' in request.data.keys():
        usr = UserLoginAndPassword.objects.get(login=request.data['login_cookie'])
        usr.token_hash = ''
        usr.token_salt = ''
        usr.save()


@csrf_exempt
@api_view(['POST'])
def authorisation_page(request):
    email, password = request.data['email'], request.data['password']
    access = False
    for obj in UserLoginAndPassword.objects.all():
        print(get_hash(password, obj.salt))
        if obj.email == email:
            salt = obj.salt
            if get_hash(password, salt) == obj.hash:
                access = True
    if access:
        token = str(random.sample(string.ascii_letters + string.digits, 40))
        resp = Response({
            'login_cookie': email,
            'auth_token': token
        })
        salt = ''.join(random.choice(string.ascii_letters + string.digits)
                       for i in range(40))
        token_info = get_hash(token, salt)
        usr = UserLoginAndPassword.objects.get(email=email)
        usr.token_hash = token_info
        usr.token_salt = salt
        usr.save()
        return resp
    else:
        return HttpResponse("NOT OK")


def raise_not_admin_user_page(request):
    return render(request, 'raise_not_admin_user.html')


def raise_anonymous_user_page(request):
    context = {
        'link': '/login',
        'text': 'login'
    }
    return render(request, 'raise_anonymous_user.html', context)


from django.db import connection

@csrf_exempt
@api_view(['POST'])
def registration_page(request):
    if (request.method == 'POST'):
        login, password, role, first_name, last_name = request.data['email'], request.data['password'], \
            request.data['role'], request.data['firstName'], request.data['lastName']
        print(login, password, role, first_name, last_name )
        print('meh')
        
        roles = {
            'GYM OWNER': '1',
            'TRAINER': '2',
            'CLIENT': '3'
        }
        login_error = False

        for obj in UserLoginAndPassword.objects.all():
            print('hehe')
            if obj.email == login:
                login_error = True
        print('hohoo')
        if not login_error:
            salt = ''.join(random.choice(
                string.ascii_letters + string.digits) for i in range(40))
            hash = get_hash(password, salt)
            info = UserCreator(login, roles[role], hash, salt,
                               first_name, last_name)
            print('created')
            return HttpResponse("ok")
        else:
            print("login exists")
            return HttpResponse("login_exists")


@api_view(['POST'])
@login_required
def deletion_page(request):
    if (request.method == 'POST'):
        id = request.data['id']
        UserLoginAndPassword.objects.filter(id=id).delete()
        return HttpResponse('deleted')