from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError

from api.serializers.productSerializers import ProductDetailBuyerSerializer, ProductListSerializer,  ProductSerializer
from api.utils import  get_buyer, get_product, get_user_id_from_token, Pagination
from api.models import  Interested, Product
from api.models.customerModels import Customer

import logging


logger = logging.getLogger(__name__)

# GET to get grid view of products
# POST to add a new product
# TODO: Add different query params: one for search, one for sorting, one for categories and so on...

class Products(APIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    serializer_class = ProductSerializer


    # Will have query params:
    # 1. search: To get the list of names of products
    # 2. prefix: To get the grid of products that start with the given prefix
    def get(self, request):

        search = request.GET.get('search')
        prefix = request.GET.get('prefix')
        sort = request.GET.get('sort')
        page = request.GET.get('page')

        if page is None:
            page = 1


        order = 'name'

        if sort == 'cost-asc':
            order = 'selling_cost'
        elif sort == 'cost-desc':
            order = '-selling_cost'
        elif sort == 'dop':
            order = '-date_of_purchase'

        if prefix:
            products = Product.objects.filter(name__icontains=prefix).order_by(order)
        else:
            products = Product.objects.all().order_by(order)


        if search:
            products = Product.objects.filter(name__icontains=search).values('id','name')
            serilaizer = ProductListSerializer(products, many=True)
            return Response(serilaizer.data)

        serilaizer = ProductSerializer(products, many=True)
        data = serilaizer.data
        pagination = Pagination(len(data))
        pagination.set_page(int(page))
        return Response(data[pagination.start: pagination.end])


# Get to get detailed view of product
class ProductsDetailedBuyer(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductDetailBuyerSerializer


    def get(self, request, pk):

        # Extract the product
        product = get_product(pk)
        buyer = get_buyer(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)


        seller = product.seller
        contact = None

        # If there as an entry in interested table and the accept is true then give sellers contact, else no
        try:
            interest_obj = Interested.objects.get(product=product, buyer=buyer)
            interested = True
            if interest_obj.accept:
                contact = seller.contact
        except Interested.DoesNotExist:
            interested = False

        email = seller.email
        username = seller.username

        serializer = ProductDetailBuyerSerializer({
            'product': product, 'interested': interested, 'contact': contact, 'email': email, 'username': username
            })
        return Response(serializer.data, status=status.HTTP_200_OK)



class ProductInterestedBuyer(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]


    # Get products in the cart for grid view
    def get(self, request):
        page = request.GET.get('page')

        if page is None:
            page = 1

        user_id = get_user_id_from_token(request)
        user = Customer.objects.get(pk=user_id)

        # Perform inner join b/w Interested and Products table

        interested_products = Interested.objects.filter(buyer=user).select_related('product')
        products = [interested_product.product for interested_product in interested_products]

        serializer = ProductSerializer(products, many=True)
        data = serializer.data
        pagination = Pagination(len(data))
        pagination.set_page(int(page))
        return Response(data[pagination.start: pagination.end])

    # To add product into the cart
    # Here the notification field in the product will become true
    def post(self, request, pk):

        product = get_product(pk)
        buyer = get_buyer(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)

        interest = Interested(product=product, buyer=buyer)

        try:
            interest.save()
            product.notification = True
            product.save()
            return Response(status=status.HTTP_200_OK)
        except IntegrityError :
            return Response(data={"message": "product already added to cart"},status=status.HTTP_409_CONFLICT)


    # To delete the product from the cart
    def delete(self, request, pk):

        product = get_product(pk)
        buyer = get_buyer(request)

        # Remove product from callers cart
        try:
            interest = Interested.objects.get(product=product, buyer=buyer)
            interest.delete()
            return Response(status=status.HTTP_200_OK)
        except Interested.DoesNotExist:
            return Response(data={"message": "product is not in cart"},status=status.HTTP_404_NOT_FOUND)



