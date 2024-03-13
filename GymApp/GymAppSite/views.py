from GymAppSite.src.authorisation import login_required, admin_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.middleware.csrf import get_token
from GymAppSite.models import UserLoginAndPassword, Gyms, GymsSerializer
from django.http import HttpResponse

def csrf(request):
    if request.method == 'POST':
        print(request)
    return JsonResponse({'csrfToken': get_token(request)})


@api_view(['POST'])
@login_required
def dashboard(request):
    obj = UserLoginAndPassword.objects.get(email=request.data['login_cookie'])
    if obj.role == '1':
        auth = '3'
    elif obj.role == '2':
        auth = '2'
    else:
        auth = '1'

    return Response({
        'auth': auth,
        'user_name': obj.firstName
    })


@api_view(['POST'])
@admin_required
def admin_page(request):
    obj = UserLoginAndPassword.objects.get(email=request.data['login_cookie'])
    return Response({
        'auth': '1',
        'user_name': obj.firstName
    })

@api_view(['POST'])
@login_required
def gyms_page(request):
    gyms = list(Gyms.objects.all())
    return Response({
        'auth': '1',
        'gyms': gyms
    })

@api_view(['POST'])
@admin_required
def add_gym(request):
    name, country, city, address = request.data['name'], \
        request.data['country'], request.data['city'], request.data['address']
    naming_error = False
    for obj in Gyms.objects.all():
        print('hehe')
        if obj.name == name or (obj.city == city and obj.address == address):
            naming_error = True
            break
    
    if not naming_error:
        GymsSerializer(name=name, country=country, city=city, address=address)
    return HttpResponse("This gym already exists")

@api_view(['POST'])
@login_required
def index_page(request):
    obj = UserLoginAndPassword.objects.get(email=request.data['login_cookie'])
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
