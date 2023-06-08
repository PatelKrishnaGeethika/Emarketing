import django
django.setup()

from api.models import Customer

# A singleton class
class Tests:

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    isAdded = False
    email = 'testuser@email.com'
    contact = '999999999'
    name = 'test_user'

    def get_test_user(self):

        try:
            user = Customer.objects.get(username=self.name, email=self.email)
        except Customer.DoesNotExist:
            user  = self.create_user()


        return user

    # Creates a test user if not present in the db
    def create_user(self):

        if self.isAdded:
            return

        try:
            user = Customer.objects.get(username=self.name, email=self.email)
            self.isAdded = True
            print(f"Test user: {user} is already present")

        except Customer.DoesNotExist:
            # Add new user to the db
            test_user = Customer(username=self.name, email=self.email, contact = self.contact)
            test_user.save()
            user = test_user
            print(f"Added test user: {test_user}")
            self.isAdded = True

        return user


