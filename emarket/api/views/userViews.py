import requests
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.serializers.userSerializers import CustomerSerializer
from api.models.customerModels import Customer
from api.utils import get_user_id_from_token


# A protected resource
class index(APIView):

    """
    ## Parameters
    ## Returns:
    - '200 OK and object of RefreshToken and access_token': If the user is already signedup
    - '404 NOT FOUND': If the user is signing in for the first time
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        u_id = get_user_id_from_token(request)
        return Response({'user_id': u_id}, status=status.HTTP_200_OK)
    def post(self, request):
        u_id = get_user_id_from_token(request)
        return Response({'user_id': u_id}, status=status.HTTP_200_OK)


def get_user_info(token):
    url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token
    profile = requests.get(url, headers={"Authorization": "Bearer "+token})
    return profile.json()


@api_view(['POST'])
def signin(request):
    data = JSONParser().parse(request)
    token = data['token']
    profile = get_user_info(token)
    email = profile['email']
    name = profile['name']

    try:
        customer = Customer.objects.get(username=name, email=email)
    except Customer.DoesNotExist:
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    refresh = RefreshToken.for_user(customer)
    return Response({
        'token': {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        },
        'profile': profile
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def signup(request):
    data = JSONParser().parse(request)
    token = data['token']
    contact = data['contact']
    profile = get_user_info(token)
    email = profile['email']
    name = profile['name']

    customer = {'email': email, 'username': name, 'contact': contact}
    serializer = CustomerSerializer(data=customer)
    if serializer.is_valid():
        serializer.save()
        customer = Customer.objects.get(username=name, email=email)
        refresh = RefreshToken.for_user(customer)
        return Response({
            'token': {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            },
            'profile': profile
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Contact(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # Gives the contact of the caller of api
    def get(self, request):
        user_id = get_user_id_from_token(request)
        user = Customer.objects.get(pk=user_id)
        return Response ({
            'contact': user.get_contact()
            })

    # Gives the contact of the caller of api
    def post(self, request):
        user_id = get_user_id_from_token(request)
        user = Customer.objects.get(pk=user_id)
        data = JSONParser().parse(request)
        new_contact = data['contact']

        return Response ({
            'contact': user.update_contact(new_contact)
            })

