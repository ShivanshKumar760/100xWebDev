from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello, welcome to the Intro App!")

def about(request):
    return HttpResponse("This is the About page of the Intro App.")

def contact(request):
    return HttpResponse("This is the Contact page of the Intro App.")

def shivansh(request):
    return HttpResponse("Hello Shivansh! Welcome to the Intro App.")


# dynamic views
def greet(request,name):
    return HttpResponse(f"Hello, {name.capitalize()}! Welcome to the Intro App!")