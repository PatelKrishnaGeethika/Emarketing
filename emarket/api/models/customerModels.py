from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomerManger(BaseUserManager):

    def create_user(self, email, username, contact, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        if not contact:
            raise ValueError("Contact is required")

        user = self.model(
                email = self.normalize_email(email),
                username = username,
                contact = contact
                )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, contact, password):
        user = self.create_user(email=email, username=username, contact=contact,password=password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user

class Customer(AbstractBaseUser):
    email 					= models.EmailField(verbose_name="email", max_length=60, unique=True)
    username 				= models.CharField(max_length=30)
    contact  				= models.CharField(max_length=10)
    profile_url             = models.URLField(max_length=120)

    date_joined				= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login				= models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin				= models.BooleanField(default=False)
    is_active				= models.BooleanField(default=True)
    is_staff				= models.BooleanField(default=False)
    is_superuser			= models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'contact']

    objects = CustomerManger()

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def get_contact(self):
        return self.contact

    def update_contact(self, new_contact):
        self.contact = new_contact
        self.save()
        return self.contact

    def __str__(self):
        return self.username
