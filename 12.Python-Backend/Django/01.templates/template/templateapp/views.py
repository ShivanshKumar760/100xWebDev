from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    return render(request, 'templateapp/home.html')

def greet(request,name):
    return render(request,'templateapp/greet.html',{
        "name":name
})
