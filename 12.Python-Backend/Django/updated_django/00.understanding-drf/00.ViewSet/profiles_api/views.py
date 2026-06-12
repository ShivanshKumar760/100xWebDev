from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from profiles_api.serializer import HelloSerializer,DemoSerializer
from profiles_api import models
from profiles_api import serializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
#the TokenAuthentication system work by genrating random genrated string and when we made any request 
#to the api we send this token string also in the request to check its authenticated or not 
from profiles_api import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
class UserProfileViewset(viewsets.ModelViewSet):
    serializer_class=serializer.UserProfileSerializers
    queryset=models.UserPorfile.objects.all()
    authentication_classes=(TokenAuthentication,)
    permission_classes=(permissions.UpdateOwnProfile,)
    filter_bakend=(filters.SearchFilter,)
    search_fields=('name','email',)

class UserLoginApiView(ObtainAuthToken):
    renderer_classes= api_settings.DEFAULT_RENDERER_CLASSES



class ProfileFeedItemViewSet(viewsets.ModelViewSet):
    authentication_classes=(TokenAuthentication,)
    serializer_class=serializer.ProfileFeedItemSerializer
    queryset=models.ProfileFeedItem.objects.all()
    # permission_classes=(
    #     permissions.UpdateOwnStatus,
    #     IsAuthenticatedOrReadOnly,# this permission will 
    #     #allow any user to read the feed items but 
    #     # only authenticated users can create, update or 
    #     # delete the feed items.   
    # )
    permissions_classes=(
        permissions.UpdateOwnStatus,
        IsAuthenticated # this permission will allow only authenticated users to read, create, update or delete the feed items.
    )

#override the perform_create() method to set the user profile to the logged in user when creating a new feed item.
#a default perform_create() method is provided by the ModelViewSet class, 
# but we need to override it to set the user profile to the logged in 
# user when creating a new feed item.
#default perform_create() method is used to save the new object in the database.
# and it saves the new object in the database by calling the save() method of the serializer.
# does it save all the fields of the serializer in the database ?
# it saves all the fields of the serializer in the database except the read-only fields.
# so if we have any read-only fields in the serializer, then those fields will not be saved in the database when we call the save() method of the serializer.
# so in our case, the user_profile field is a read-only field in the ProfileFeedItemSerializer,
# so when we call the save() method of the serializer, it will not save the user_profile field in the database.
#then why we created a custom perform_create() method ?
# we created a custom perform_create() method to set the user_profile field to the logged in user when creating a new feed item.
# but how will it save if its a read-only field ?
# it will save because we are overriding the perform_create() method and we are setting the user_profile field to the logged in user before calling the save() method of the serializer.
#so  is perform_create() a serializer method or a viewset method ?
# perform_create() is a viewset method. it is a method that is provided by the ModelViewSet class and it is used to save the new object in the 
# database when we call the create() method of the viewset. 
# so when we call the create() method of the viewset, 
# it will call the perform_create() method to save the new object in the database. 
# and we are overriding the perform_create() method to set the 
# user_profile field to the logged in user before saving the new object in the database.
# but user_profile is a read-only field in the serializer, so how will it save in the database ?
# it will save because we are setting the user_profile field to the logged in user before calling the save() method of the serializer.
    def perform_create(self,serializer):
        """Sets the user profile to the logged in user"""
        serializer.save(user_profile=self.request.user)
