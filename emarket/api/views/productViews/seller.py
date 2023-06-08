# All the apis here will start with the url /api/seller/
from django.conf import settings
import os
import shutil

from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.serializers.productSerializers import  InterestedSerializer,   ProductDetailSerializer, ProductSerializer, SoldProductSerializer
from api.utils import get_product, get_user_id_from_token, Pagination
from api.models import  Interested, Product
from api.models.productModels import SoldProduct


class Notification(APIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = get_user_id_from_token(request)
        notifications = Product.objects.filter(seller_id=user_id, notification=True)
        if len(notifications):
            return Response(True)
        else:
            return Response(False)

class ProductsSeller(APIView):

    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    # For grid view in myproducts page
    def get(self, request):

        page = request.GET.get('page')
        if page is None:
            page = 1

        seller_id = get_user_id_from_token(request)
        products = Product.objects.filter(seller_id=seller_id)
        serilaizer = ProductSerializer(products, many=True)

        data = serilaizer.data
        pagination = Pagination(len(data))
        pagination.set_page(int(page))

        return Response(data[pagination.start: pagination.end])

    # To add new product
    def post(self, request):
        seller_id = get_user_id_from_token(request)
        serializer = ProductDetailSerializer(data=request.data, context={'seller_id':seller_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

# Get request to get the info that is displayed in myproduct/:id page
# Only seller can call it
# PUT to update the product
# DELETE to remove the product
class ProductDetailedSeller(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    # Get request to get the info that is displayed in myproduct/:id page
    # Here the notification should become false
    def get(self, request, pk):

        caller_id = get_user_id_from_token(request)
        product = get_product(pk)
        seller = product.seller

        if seller.id != caller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        serializer = ProductDetailSerializer(product)
        product.notification = False
        product.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    # To update the product
    def put(self, request, pk):

        user_id = get_user_id_from_token(request)
        product = get_product(pk)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_404_NOT_FOUND)

        if user_id != product.seller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        serializer = ProductDetailSerializer(product, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # To delete the product
    def delete(self, request, pk):

        user_id = get_user_id_from_token(request)

        product = get_product(pk)
        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_400_BAD_REQUEST)

        if user_id != product.seller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        product.delete() # Deletes images in the Image model and deletes the images from the file system

        return Response(status=status.HTTP_200_OK)


class ProductInterestedSeller(APIView):

    # Get info of interested_peeps
    def get(self, request, pk):

        product = get_product(pk)
        seller = product.seller
        caller_id = get_user_id_from_token(request)

        if product is None:
            return Response(data={"message": "product not found"},status=status.HTTP_400_BAD_REQUEST)

        if seller.id != caller_id:
            return Response(data={"message": "Accessible only to seller"},status=status.HTTP_403_FORBIDDEN)

        interested_peeps = Interested.objects.filter(product=product)
        serializer = InterestedSerializer(interested_peeps, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    # To accept/reject the interest of the buyer
    def post(self, request, pk):

        product = get_product(pk)

        serializer = InterestedSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            buyer_id = data['buyer_id']
            interested_obj = Interested.objects.get(buyer_id=buyer_id, product=product)
            print(interested_obj.accept)
            interested_obj.accept = data['accept']
            interested_obj.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class SoldProducts(APIView):

    authentication_classes = [JWTAuthentication ]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        page = request.GET.get('page')
        if page is None:
            page = 1

        seller_id = get_user_id_from_token(request)
        sold_products = SoldProduct.objects.filter(seller=seller_id)
        serializer = SoldProductSerializer(sold_products, many=True)

        data = serializer.data
        pagination = Pagination(len(data))
        pagination.set_page(int(page))

        return Response(data[pagination.start: pagination.end])

    def post(self, request, pk):
        user_id = get_user_id_from_token(request)

        product = Product.objects.get(pk=pk)

        if product.seller.id != user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)

        ser = ProductSerializer(product)
        paths = ser.data['image']['image'].split('/')
        image_path = paths[-2] +'/'+ paths[-1]
        image_path = f"{settings.MEDIA_ROOT}/images/{image_path}"
        paths = image_path.split('/')
        dest_path_name = f"sold_images/{paths[-2]}/{paths[-1]}"
        dest_path = paths[-2] +'/'+ paths[-1]
        dest_path = f"{settings.MEDIA_ROOT}/sold_images/{dest_path}"

        if not os.path.exists(os.path.dirname(dest_path)):
            os.makedirs(os.path.dirname(dest_path))

        shutil.copy(image_path, dest_path)

        product_data = ser.data
        sold_product = SoldProduct(name = product_data['name'],
                                   selling_cost = product_data['selling_cost'],
                                   actual_cost = product_data['actual_cost'],
                                   date_of_purchase = product_data['date_of_purchase'],
                                   image = dest_path_name , seller = product.seller)

        sold_product.save()
        product.delete()

        return Response()
