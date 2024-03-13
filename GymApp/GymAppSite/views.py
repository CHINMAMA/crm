from django.shortcuts import render
from GymAppSite.src.authorisation import login_required, admin_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from GymAppSite.models import UserLoginAndPassword

def csrf(request):
    if request.method == 'POST':
        print(request)
    return JsonResponse({'csrfToken': get_token(request)})

def get_base_context(registered = True):
    context = {
        'menu': [
            {'link': '/', 'text': 'Главная'},
            {'link': '/login', 'text': 'Логин'},
            {'link': '/logout', 'text': 'Выйти'},
            {'link': '/registrate', 'text': 'Добавить пользователя'},
            {'link': '/deletion', 'text': 'Удалить пользователя'},
        ]
    }
    return context

@api_view(['POST'])
@login_required
def index_page(request):
    obj = UserLoginAndPassword.objects.get(email = request.data['login_cookie'])
    obj_dict = obj.__dict__
    return_dict = {
        'id': obj_dict['id'],
        'email': obj_dict['email'],
        'role': obj_dict['role'],
        'firstName': obj_dict['firstName'],
        'lastName': obj_dict['lastName'],
    }
    return Response({
        'auth': '1',
        'user_data': return_dict
    })