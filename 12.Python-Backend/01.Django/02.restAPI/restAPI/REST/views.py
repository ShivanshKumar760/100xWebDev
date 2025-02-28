from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET', 'POST'])
def product_list(request):
    # GET - List all products
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # POST - Create new product
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    # GET - Retrieve single product
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    # DELETE - Delete product
    elif request.method == 'DELETE':
        product.delete()
        return Response({'message': 'Product deleted'}, status=status.HTTP_204_NO_CONTENT)