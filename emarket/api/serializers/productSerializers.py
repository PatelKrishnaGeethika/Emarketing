from rest_framework import serializers
from api.models import Product, Image
from api.models import Customer
from api.models.productModels import Interested, SoldProduct
from api.serializers.userSerializers import CustomerSerializer

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'id')

class ProductListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

# Used in the grid view of home page
# where only name, cost, age and a single image is displayed
class ProductSerializer(serializers.ModelSerializer):

    # Nesting serializers will automatically perform inner joins
    image = ImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'actual_cost', 'selling_cost', 'date_of_purchase', 'image', 'notification')

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        first_img = Image.objects.filter(product=instance).order_by('id').first()
        if first_img:
            representation['image'] = ImagesSerializer(first_img).data
        else:
            representation['image'] = None

        return representation



# To get the detailed info of a product
class ProductDetailSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, read_only=True) # To send images present in db
    uploaded_images = serializers.ListField(
            child=serializers.ImageField(allow_empty_file=True, use_url=False),
            required=False,
            write_only=True,
            ) # To add/upload new images into the db
    seller_id = serializers.IntegerField(read_only=True)


    # TODO: Might not need seller_id look into it later
    class Meta:
        model = Product
        fields = ('id', 'name', 'actual_cost', 'selling_cost', 'description', 'date_of_purchase', 'images', 'uploaded_images', 'seller_id')

    def create(self, validated_data):
        # Get the seller id from the view and add it to the serialzer
        seller_id = self.context.get('seller_id')
        seller = Customer.objects.get(pk=seller_id)
        validated_data['seller'] = seller
        uploaded_images = None

        if 'uploaded_images' in validated_data:
            uploaded_images = validated_data.pop('uploaded_images')

        product = Product.objects.create(**validated_data)

        if uploaded_images:
            for img in uploaded_images:
                Image.objects.create(product=product, image=img)
        else:
            Image.objects.create(product=product)

        return product

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)

        # Get the seller id from the view and add it to the serialzer
        uploaded_images = validated_data.pop('uploaded_images')
        product = Product.objects.get(**validated_data)
        images = Image.objects.filter(product=product)

        images.delete() # Does this delete images from the file system ???

        for img in uploaded_images:
            Image.objects.create(product=product, image=img)

        instance.save()

        return instance


class ProductDetailBuyerSerializer(serializers.Serializer):

    product = ProductDetailSerializer(read_only=True)
    interested = serializers.BooleanField(default=False)
    email= serializers.EmailField( max_length=60)
    username = serializers.CharField(max_length=30)
    contact = serializers.CharField(max_length=10)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        comb_data = {
                'product':{
                    **data['product']
                    },
                'interested': data['interested'],
                'seller': {
                    'username': data['username'],
                    'email': data['email'],
                    'contact': data['contact']
                    }
                }

        return comb_data

class InterestedSerializer(serializers.ModelSerializer):
    buyer = CustomerSerializer(read_only=True)
    buyer_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Interested
        fields = ('buyer', 'accept', 'buyer_id')


class SoldProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoldProduct
        fields = "__all__"
