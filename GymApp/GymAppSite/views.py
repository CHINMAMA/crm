from GymAppSite.src.authorisation import login_required, admin_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.middleware.csrf import get_token
from GymAppSite.models import UserLoginAndPassword, Gyms, GymsSerializer, \
    Scedules, ScedulesSerializer
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
@login_required
def get_scedules_for_user(request):
    usr = UserLoginAndPassword.objects.get(email=request.data['login_cookie'])
    scedules = []
    for obj in Scedules.objects.all:
        if obj.client == usr:
            scedules.append({
                'beg': obj.begin,
                'end': obj.end
            })
    return Response({
        'auth': '1',
        'scedules': scedules
    })

@api_view(['POST'])
@login_required
def add_scedule_for_user(request):
    begin, end = request.data['begin'], request.data['end']
    usr = UserLoginAndPassword.objects.get(email=request.data['login_cookie'])
    scedules = []
    for obj in Scedules.objects.all:
        if obj.client == usr:
            scedules.append({
                'id': obj.id,
                'beg': obj.begin,
                'end': obj.end
            })
    if (len(scedules) > 20):
        return HttpResponse('too much scedules')
    for i in scedules:
        if (i.begin < begin and i.end > begin) or \
            (i.begin < end and i.end > end) or \
            (i.end < end and i.begin > begin) or \
            (i.begin < begin and i.end > end):
            return HttpResponse('wrong time')
    else:
        ScedulesSerializer(client=usr, begin=begin, end=end)
        return HttpResponse('ok')

@api_view(['POST'])
@login_required
def delete_scedule_for_user(request):
    try:
        UserLoginAndPassword.objects.filter(id=request.data['id'], \
            client=UserLoginAndPassword.objects.get(email=request.data['login_cookie'])).delete()
        return HttpResponse('ok')
    except:
        return HttpResponse('ddeletion went wrong')

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
