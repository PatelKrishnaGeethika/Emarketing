from rest_framework.test import APITestCase
from api.models.customerModels import Customer
from rest_framework_simplejwt.tokens import RefreshToken

class UserTest(APITestCase):

    email = 'testuser@email.com'
    contact = '999999999'
    name = 'test_user'

    def setUp(self):
        self.user = Customer(username = self.name, email = self.email, contact = self.contact)
        self.user.save()
        self.user_id = self.user.id
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')



