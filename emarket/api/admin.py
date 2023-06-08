
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import Customer, Product, Image



class CustomerAdmin(UserAdmin):
	list_display = ('email','username','contact','date_joined', 'last_login', 'is_admin','is_staff')
	search_fields = ('email','username',)
	readonly_fields=('id', 'date_joined', 'last_login')

	filter_horizontal = ()
	list_filter = ()
	fieldsets = ()


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Product)
admin.site.register(Image)

# Register your models here.
