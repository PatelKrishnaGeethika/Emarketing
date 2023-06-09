# Generated by Django 4.2 on 2023-04-10 10:02

import api.models.productModels
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_comments_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(),
        ),
        migrations.CreateModel(
            name='SoldProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('selling_cost', models.PositiveIntegerField()),
                ('date_of_purchase', models.DateField()),
                ('image', models.ImageField(upload_to=api.models.productModels.user_sold_images_path)),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sellerId', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
