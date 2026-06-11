from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('shivansh/', views.shivansh, name='shivansh'),
    # dynamic url pattern
    path('greet/<str:name>/', views.greet, name='greet'),
]