from rest_framework_simplejwt.views import status
from api.tests.testUsers import UserTest
from api.models.productModels import Product
from api.serializers.productSerializers import ProductDetailSerializer


class ProductTests(UserTest):


    def test_add_product(self):
        url = '/api/products/seller/'
        data = {'name': 'test product1', 'actual_cost': 500, 'selling_cost': 200,
                'description': ' Product added for testing purposes', 'date_of_purchase': '2022-04-28'}

        res = self.client.post(url, data, fromat='json') # From server

        serializer = ProductDetailSerializer(data=data, context={'seller_id':self.user_id})

        if serializer.is_valid():
            print(serializer.data, res.data)



    def test_all_products(self):

        url = '/api/products/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


