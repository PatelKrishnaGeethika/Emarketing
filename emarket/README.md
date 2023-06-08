## Backend directory structure

../\
emarket/\
| api/\
| | migrations/                         - Created by django while migrations\
| | models/\
| | | __init__.py\
| | | customerModels.py                 - Contains models related to relational schema of Customer/User\
| | | productModels.py                  - Contains models related to relational schema of Product and Comment\
| | serializers/                        - Contains all serializers which convert from python objects to models\
| | tests/\
| | | __init__.py\
| | | testProducts.py                   - Contains tests related to product apis\
| | | testUsers.py                      - Contains tests related to customer/user apis\
| | views/\
| | | productViews/\
| | |  | buyer.py                       - Contains api endpoints of buyer specific apis\
| | |  | seller.py                      - Contains api endpoints of seller specific apis\
| | | __init__.py\
| | | otpViews.py                       - Contains api endpoints to generate and verify otp\
| | | userViews.py                      - Contains api endpoints to user sepcific apis\
| | __init__.py\
| | urls.py                             - Contains all api endpoints and their respective views\
| | utils.py                            - Contains some utility functions\
| client/\
| emarket/                              - django specific directory\
| images/                               - Contains images of the products organised in the user_id directory\
| sold_images/                          - Contains image of the sold products organised in the user_id directory\
| manage.py*\
