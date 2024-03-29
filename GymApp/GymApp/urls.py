from django.contrib import admin
from django.urls import path
from GymAppSite import views
from GymAppSite.src import authorisation

urlpatterns = [
    path('csrf/', views.csrf),
    path('dashboard/', views.dashboard),
    path('login/', authorisation.authorisation_page),
    path('logout/', authorisation.logout_page),
    path('register/', authorisation.registration_page),
    path('deletion/', authorisation.deletion_page),
    path('view_gyms/', views.gyms_page),
    path('add_gym/', views.add_gym),
    path('view_users/', views.view_users),
    path('delete_user_by_admin/', views.delete_user_by_admin),
    path('get_scedules_for_user/', views.get_scedules_for_user),
    path('add_scedule_for_user/', views.add_scedule_for_user),
    path('delete_scedule_for_user/', views.delete_scedule_for_user),
]