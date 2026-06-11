from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('isnewyear/', views.is_new_year, name='is_new_year')
]
