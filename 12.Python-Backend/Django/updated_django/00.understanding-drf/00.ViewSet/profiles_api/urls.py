from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from profiles_api import APIView ,VIEWSet
from profiles_api import views
router = DefaultRouter()
router.register('hello-viewset',VIEWSet.HelloViewSet,basename='hello-viewset')
router.register('profile',views.UserProfileViewset)
router.register('feed',views.ProfileFeedItemViewSet)


urlpatterns = [
    path("hello-view/", APIView.HelloApiView.as_view()),#this is the url for our api view. we will create a new file called urls.py in our profiles_api app and we will define the url for our api view in that file. and then we will include that url in our main urls.py file.
    #what is the use of as_view() method? it is used to convert the class based view into a function based view. it is used to call the get method of the class based view when we hit the url. it is used to create an instance of the class based view and then call the get method of that instance.
    path('hello-view/<int:pk>/', APIView.HelloApiView.as_view()),
    # path("hello-viewset/", VIEWSet.HelloViewSet.as_view({'get':'list'})),#this is the url for our viewset. we will create a new file called viewset.py in our profiles_api app and we will define the viewset in that file. and then we will include that url in our main urls.py file.
    #why did we use as_view({'get':'list'})? it is because we want to call the list method of the viewset when we hit the url. and the list method is used to return a list of objects. so when we hit the url, it will call the list method of the viewset and it will return a list of objects.
    #what if want to call post on it ?
    # path("hello-viewset/", VIEWSet.HelloViewSet.as_view({'post':'create'})),#this is the url for our viewset. we will create a new file called viewset.py in our profiles_api app and we will define the viewset in that file. and then we will include that url in our main urls.py file.
    #what if we want to call both get and post on the same url ? we can do that by passing a dictionary to the as_view() method. the dictionary will have the http method as the key and the name of the method in the viewset as the value. so if we want to call both get and post on the same url, we can do that like this:
    # path("hello-viewset/", VIEWSet.HelloViewSet.as_view({'get':'list','post':'create'})),#this is the url for our viewset. we will create a new file called viewset.py in our profiles_api app and we will define the viewset in that file. and then we will include that url in our main urls.py file.
    #What if we want to call delete on it ? we can do that by passing a dictionary to the as_view() method. the dictionary will have the http method as the key and the name of the method in the viewset as the value. so if we want to call both get and delete on the same url, we can do that like this:
    # path("hello-viewset/", VIEWSet.HelloViewSet.as_view({'get':'list','delete':'destroy'})),#this is the url for our viewset. we will create a new file called viewset.py in our profiles_api app and we will define the viewset in that file. and then we will include that url in our main urls.py file.

    #so instead of writing all the urls for the viewset like this, we can use the router to automatically generate the urls for us. we just need to register the viewset with the router and then include the router urls in our main urls.py file. so we will do that like this:
    path('/login',views.UserLoginApiView.as_view()),
    path('',include(router.urls))
]