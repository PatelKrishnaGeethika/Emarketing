from rest_framework import serializers
from api.models.customerModels import Customer


# If user is present then generates and returns the token, else returns error status code
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'username', 'contact']
