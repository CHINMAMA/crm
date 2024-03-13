from django.contrib import admin
from django.urls import path
from GymAppSite import views
from GymAppSite.src import authorisation

urlpatterns = [
    path('csrf/', views.csrf),
    path('admin/', admin.site.urls),
    path('index/', views.index_page),
    path('', views.index_page),
    path('login/', authorisation.authorisation_page),
    path('logout/', authorisation.logout_page),
    path('register/', authorisation.registration_page),
    path('deletion/', authorisation.deletion_page),
    # path('raise_anonymous_user/', authorisation.raise_anonymous_user_page),
    # path('raise_not_admin_user/', authorisation.raise_not_admin_user_page),
]