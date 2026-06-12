from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status #for http status codes
from profiles_api.serializer import HelloSerializer, DemoSerializer
class HelloApiView(APIView):

    serializer_class=HelloSerializer
    #we should always name the serializer class as serializer_class because it is a convention and it is used by the rest framework to automatically generate 
    # the documentation for our api view. if we name it something else then the documentation will not be generated correctly.
    def get(self,request,pk=None,format=None):
        if pk:
            return Response({
            "message": f"You requested GET for user id {pk}"
        })

        an_apiview=[
            'uses HTTP methods as function (get, post, patch, put, delete)',
            'is similar to a traditional django view',
            'gives you the most control over your application logic',
            'is mapped manually to urls'    
        ]
        return Response({'message':'Hello','an_apiview':an_apiview})
    
    def post(self,request,pk=None):
        if pk:
            return Response({
            "message": f"You requested GET for user id {pk}"
        })
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}'
            return Response({'message':message})
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request,pk):
        """
        class DemoSerializer(serializers.Serializer):
            id= serializers.IntegerField()
            name = serializers.CharField(max_length=10)
            task = serializers.CharField(max_length=10)
        """
        database={
            1:{"name":"John","task":"Task 1"},
            2:{"name":"Jane","task":"Task 2"},
            3:{"name":"Doe","task":"Task 3"}
        }
        if pk not in database:
            return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
            )

        #lets update the task field of the serializer and save in a in-memory database (a dictionary) and return the updated task field in the response.
        #update via id only task name will be sent in the request body and we will update the task field of the serializer and return the updated task field in the response.
        # name will not be sent , task and id will be sent in the request body. we will update the task field of the serializer and return the updated task field in the response.
        #response will have the id , name and task fields. name will be same as before and task will be updated.
        serializer=DemoSerializer(data=request.data,partial=True)
        if serializer.is_valid():
            existing_user = database[pk]
            if "task" in serializer.validated_data:
                existing_user["task"] = serializer.validated_data["task"]
            if "name" in serializer.validated_data:
                existing_user["name"] = serializer.validated_data["name"]
            database[pk] = existing_user
            return Response({
            "id": pk,
            "name": existing_user["name"],
            "task": existing_user["task"]
        })
    
    def delete(self,request,pk):
        database={
            1:{"name":"John","task":"Task 1"},
            2:{"name":"Jane","task":"Task 2"},
            3:{"name":"Doe","task":"Task 3"}
        }
        if pk not in database:
            return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
            )
        del database[pk]
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk):
        database={
            1:{"name":"John","task":"Task 1"},
            2:{"name":"Jane","task":"Task 2"},
            3:{"name":"Doe","task":"Task 3"}
        }
        if pk not in database:
            return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
            )
        serializer=DemoSerializer(data=request.data,partial=True)
        if serializer.is_valid():
            existing_user = database[pk]
            existing_user["name"] = serializer.validated_data["name"]
            existing_user["task"] = serializer.validated_data["task"]
            database[pk] = existing_user
            return Response({
            "id": pk,
            "name": existing_user["name"],
            "task": existing_user["task"]
        })


    