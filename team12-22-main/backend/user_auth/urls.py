from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import *


urlpatterns = [
    # path('login/', login_view,'login'),
    path('sign-up/', sign_up_view, name='sign-up'),
    path('profile/', profile_view, name='profile'),
]