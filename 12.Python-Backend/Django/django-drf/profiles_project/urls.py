"""
URL configuration for profiles_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from profiles_api import APIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/",include('profiles_api.urls'))#this is the url for our api view. we will create a new file called urls.py in our profiles_api app and we will define the url for our api view in that file. and then we will include that url in our main urls.py file.
]
