#TODO: Add a seperate table sold product

import os
from django.db import models
from django.dispatch import receiver
from api.models.customerModels import Customer


def user_images_path(instance, filename):
    return 'images/{0}/{1}'.format(instance.product.seller.id, filename)


class Product(models.Model):
    name = models.CharField(max_length=30)
    actual_cost = models.PositiveIntegerField()
    selling_cost = models.PositiveIntegerField()
    description = models.TextField()
    date_of_purchase = models.DateField()
    seller = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='seller_id')
    notification = models.BooleanField(default=False)

    def __str__(self):
        return "product: %s, selling cost: %s " % (self.name, self.selling_cost)


class Image(models.Model):
    image = models.ImageField(upload_to=user_images_path, default='images/core/no_image.png')
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.image.name


class Comment(models.Model):
    comment = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    commentor = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return "product: %s, commentor: %s and comment: %s" % (self.product, self.commentor, self.comment)


class Interested(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    accept = models.BooleanField(default=False)

    class Meta:
        unique_together = (('product', 'buyer'),)

@receiver(models.signals.post_delete, sender=Image)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Product` object is deleted.
    """
    if instance.image:
        path = instance.image.path
        image_dir = path.split('/')[-2]
        if image_dir != 'core':
            if os.path.isfile(path):
                os.remove(path)


def user_sold_images_path(instance, filename):
    return 'sold_images/{0}/{1}'.format(instance.product.seller.id, filename)

class SoldProduct(models.Model):
    name = models.CharField(max_length=30)
    selling_cost = models.PositiveIntegerField()
    actual_cost = models.PositiveIntegerField()
    date_of_purchase = models.DateField()
    seller = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='sellerId')
    image = models.ImageField(upload_to=user_sold_images_path)

    def __str__(self):
        return "product: %s, selling cost: %s " % (self.name, self.selling_cost)
