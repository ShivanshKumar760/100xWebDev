from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from profiles_api.serializer import HelloSerializer,DemoSerializer

class HelloViewSet(viewsets.ViewSet):
    """Test API ViewSet"""
    def list(self,request):
        return Response({
            "message": "Hello",
            "an_viewset":[
                'uses actions (list, create, retrieve, update, partial_update)',
                'automatically maps to urls using Routers',
                'provides more functionality with less code'
            ]
        })
    """ def post(self,request,pk=None):
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
        })"""
    # we will implement the viewset version of the above
    def create(self,request):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}'
            return Response({'message':message})
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self,request,pk=None):
        if pk:
            return Response({
            "message": f"You requested GET for user id {pk}"
        })
        else:
            return Response({
            "message": f"You requested GET for all users"
        })
    
    def update(self,request,pk=None):
        print(type(pk))
        converted_pk = int(pk)
        pk = converted_pk
        database={
            1:{"name":"John","task":"Task 1"},
            2:{"name":"Jane","task":"Task 2"},
            3:{"name":"Doe","task":"Task 3"}
        }
        print(2 in database)
        if pk not in database:
            print("entering here")
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
    def partial_update(self,request,pk=None):
        print(pk)
        pk = int(pk)
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

    def destroy(self,request,pk=None):
        pk=int(pk)
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



    
