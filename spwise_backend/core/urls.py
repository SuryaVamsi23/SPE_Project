from django.contrib import admin
from django.urls import path
from .views import create_user_profile

urlpatterns = [
    path('create_user',create_user_profile)
]
