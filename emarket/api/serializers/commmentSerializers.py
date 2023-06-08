from rest_framework import serializers

from api.models.productModels import Comment, Product
from api.models.customerModels import Customer


class CommentSerializer(serializers.ModelSerializer):

    commentor = serializers.CharField(read_only=True)


    class Meta:
        model = Comment
        fields = ("comment", 'commentor')

    def create(self, validated_data):
        # Get the seller id from the view and add it to the serialzer
        commentor_id = self.context.get('commentor')
        commentor = Customer.objects.get(pk=commentor_id)

        product = self.context.get('product')

        validated_data['commentor'] = commentor
        validated_data['product'] = product

        comment = Comment.objects.create(**validated_data)

        return comment

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['commentor'] = str(instance.commentor)

        return representation
