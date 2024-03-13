from django.contrib import admin
from django.urls import path
from GymAppSite import views
from GymAppSite.src import authorisation

urlpatterns = [
    path('csrf/', views.csrf),
    path('dashboard/', views.dashboard),
    path('index/', views.index_page),
    path('', views.index_page),
    path('login/', authorisation.authorisation_page),
    path('logout/', authorisation.logout_page),
    path('register/', authorisation.registration_page),
    # path('deletion/', authorisation.deletion_page),
    path('view_gyms/', views.gyms_page),
    path('add_gym/', views.add_gym),
]