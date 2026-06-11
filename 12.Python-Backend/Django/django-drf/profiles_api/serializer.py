from rest_framework import serializers
from profiles_api import models
class HelloSerializer(serializers.Serializer):
    """Serializes a name field for testing our APIView"""
    name = serializers.CharField(max_length=10)

class DemoSerializer(serializers.Serializer):
    """Serializes a name field for testing our APIView"""
    id= serializers.IntegerField()
    name = serializers.CharField(max_length=10)
    task = serializers.CharField(max_length=10)


class UserProfileSerializers(serializers.ModelSerializer):
    class Meta:
         model=models.UserPorfile
         fields=('id','email','name','password')
         extra_kwargs={
             'password':{
                 'write_only':True,
                 'style':{'intput_type':'password'}
            }
        }
    
    def create(self,validated_data):
        user = models.UserPorfile.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user
    
    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)

class ProfileFeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProfileFeedItem
        fields=('id','user_profile','status_text','created_on')
        extra_kwargs={
            'user_profile':{
                'read_only':True
            }
        }

#this serializer will be used to serialize the ProfileFeedItem model. 
# it will be used to convert the ProfileFeedItem model into a json format that can be 
# sent in the response of the api. 
# it will also be used to convert the json format that is sent in the request of the api into a 
# ProfileFeedItem model that can be saved in the database.

#the interaction with ProfileFeedItem model will be handled by the viewset that we will create in the views.py file.
#but will we use the serializer to save the data in the database ? 
# yes, we will use the serializer to save the data in the database. 
# we will use the serializer to validate the data that is sent in the request and then we will use the serializer 
# to save the data in the database. 
# we will do that in the viewset that we will create in the views.py file.

#but we havent created a def create method in the serializer ?
# we will not create a def create method in the serializer because 
# we will use the default create method that is provided by the ModelSerializer class.