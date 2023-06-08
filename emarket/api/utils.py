from api.models import Customer, Product
from django.conf import settings

def get_user_id_from_token(request):
    """
    print('From server:', request.headers)
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    decoded = AccessToken(token)
    user_id = decoded['user_id']
    """
    user_id = request.user.id
    return user_id

def get_product(pk):
    try:
        return Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return None

def get_buyer(request):
    buyer_id = get_user_id_from_token(request)
    return Customer.objects.get(pk=buyer_id)


page_size = settings.PAGE_SIZE

class Pagination():
    start = 0
    end = page_size

    def __init__(self, total_objs):
        self.total_objs = total_objs

    def set_page(self, page_no):
        self.start = (page_no-1)*page_size

        if self.start > self.total_objs:
            self.start = self.total_objs

        self.end = self.start + page_size

        if self.end  > self.total_objs:
            self.end = self.total_objs
