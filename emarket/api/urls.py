from django.urls import path
from api.views import userViews
from api.views.productViews import buyer, seller, comments
from api.views import otpViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # Token related paths
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # All user related views
    path('users/', userViews.index.as_view()),
    path('users/signin/', userViews.signin),
    path('users/signup/', userViews.signup),
    path('users/contact/', userViews.Contact.as_view()),

    # All product related views

    #For Buyers side
    path('products/', buyer.Products.as_view()),
    path('products/<int:pk>/', buyer.ProductsDetailedBuyer.as_view()),
    path('products/interested/', buyer.ProductInterestedBuyer.as_view()),
    path('products/interested/<int:pk>/', buyer.ProductInterestedBuyer.as_view()),

    #For Sellers side
    path('products/seller/', seller.ProductsSeller.as_view()),
    path('products/seller/<int:pk>/', seller.ProductDetailedSeller.as_view()),
    path('products/seller/notifications/', seller.Notification.as_view()),
    path('products/seller/interested/<int:pk>/', seller.ProductInterestedSeller.as_view()),

    # For sold products
    path('products/sold/', seller.SoldProducts.as_view()),
    path('products/sold/<int:pk>/', seller.SoldProducts.as_view()),

    # For comments
    path('comments/<int:pk>', comments.Comments.as_view()),

    # OTP / 2FA related views
    path('generate_otp/', otpViews.generate_otp),
    path('verify_otp/', otpViews.verify_otp),
]
