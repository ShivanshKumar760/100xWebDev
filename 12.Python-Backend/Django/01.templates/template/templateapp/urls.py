
from django.urls import path
from . import views 

urlpatterns = [
    path('home/', views.home, name='home'),
    path('greet/<str:name>',views.greet,name='greet')
]
