from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Category, Cart, Restaurant, Sucursale, Order
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

@api.route('/user', methods=['GET'])
def get_user():
    all_user = User.query.all()
    user_serialize = [user.serialize() for user in all_user]
    return jsonify(user_serialize), 200

@api.route("/user", methods=["POST"])
def post_user():
    body = request.json
    user = User.query.filter_by(email = body['email']).first()
    
    if user:
        return jsonify({"msg": "Usuario ya existe"}), 401
    
    new_user = User(
        email=body['email'],
        password=body["password"]
    )

    db.session.add(new_user)
    db.session.commit()
 
    return jsonify({"msg" : "Usuario creado"}) , 200

@api.route('/user/<int:id>', methods=['PUT'])
def put_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    body = request.json
    user.email = body['email']
    user.password = body['password']

    db.session.commit()

    return jsonify({"message": "Usuario modificado con éxito"}), 200

@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Producto eliminado con éxito"}), 200

@api.route("/login_user", methods=["POST"])
def post_login_user():
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    
    user = Restaurant.query.filter_by(name=name, password=password).first()
    
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
 
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id , "user":"restaurant"}) , 200

@api.route("/login_admin", methods=["POST"])
def post_login_admin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
 
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id , "user":"admin"}) , 200

@api.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    products_serialize = [product.serialize() for product in all_products]
    product_with_product_info = []

    for item in products_serialize:
        category_id = item["id_category"]
        category = Category.query.get(category_id)
        
        if category:
            item['category_info'] = category.serialize()
            product_with_product_info.append(item)

    return jsonify(products_serialize), 200

@api.route('/products', methods=['POST'])
def post_product():
    body = request.json
    
    new_product = Product(
        name=body['name'],
        description=body['description'],
        price=body['price'],
        amount=body['amount'],
        url_img=body['url_img'],
        idu_img=body['idu_img'],
        id_category= body['id_category']
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Producto creado con éxito"}), 200
    
@api.route('/products/<int:id>', methods=['PUT'])
def put_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    
    body = request.json
    product.name = body['name']
    product.description = body['description']
    product.price = body['price']
    product.amount = body['amount']
    product.url_img = body['url']
    product.idu_img = body['idu']
    product.id_category = body['id_category']
    db.session.commit()

    return jsonify({"message": "Producto modificado con éxito"}), 200

@api.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Producto eliminado con éxito"}), 200

@api.route('/category', methods=['GET'])
def get_categories():
    all_categories = Category.query.all()
    categories_serialize = [Categories.serialize() for Categories in all_categories]

    return jsonify(categories_serialize), 200

@api.route('/category', methods=['POST'])
def post_categories():
    body = request.json
    new_categories = Category(
        name=body['name'],
        url_img=body['url_img'],
        idu_img=body['idu_img']
    )
    db.session.add(new_categories)
    db.session.commit()

    return jsonify({"message": "Categoría creada con éxito"}), 200

@api.route('/category/<int:id>', methods=['PUT'])
def put_categories(id):
    categories = Category.query.get(id)

    if not categories:
        return jsonify({"message": "Categoría no encontrada"}), 404
    body = request.json

    categories.name = body['name']
    categories.url_img = body['url_img']
    categories.idu_img = body['idu_img']

    db.session.commit()

    return jsonify({"message": "Categoría modificada con éxito"}), 200

@api.route('/category/<int:id>', methods=['DELETE'])
def delete_categories(id):
    categories = Category.query.get(id)

    if not categories:
        return jsonify({"message": "Categoría no encontrada"}), 404
    
    db.session.delete(categories)
    db.session.commit()

    return jsonify({"message": "Categoría eliminada con éxito"}), 200

@api.route('/cart', methods=['GET'])
@jwt_required()
def get_carts():
    id = get_jwt_identity()

    all_items = Cart.query.filter_by(id_Restaurant = id).all()
    items_serialize = [item.serialize() for item in all_items]
    cart_with_product_info = []

    for item in items_serialize:
        product_id = item["id_Product"]
        product = Product.query.get(product_id)
        if product:
            item['product_info'] = product.serialize()
            cart_with_product_info.append(item)
    print(cart_with_product_info)
    return jsonify(cart_with_product_info), 200

@api.route('/cart/<int:id>', methods=['PUT'])
def put_cart(id):
    cart = Cart.query.get(id)

    if not cart:
        return jsonify({"message": "Carrito no encontrado"}), 404
    
    body = request.json

    cart.amount = body['amount']
    cart.id_Producto = body['id_Product']
    cart.id_Restaurant = body['id_Restaurant']
    cart.id_Order = body['id_Order']

    db.session.commit()

    return jsonify({"message": "Carrito modificado con éxito"}), 200

@api.route('/cart_add_idOrder/<int:id>', methods=['PUT'])
def add_order_cart(id):
    cart = Cart.query.get(id)

    if not cart:
        return jsonify({"message": "Carrito no encontrado"}), 404
    
    body = request.json

    cart.amount = body['amount']
    cart.id_Producto = body['id_Product']
    cart.id_Restaurant = body['id_Restaurant']
    cart.id_Order = body['id_Order']

    db.session.commit()

    return jsonify({"message": "orden annadida con éxito"}), 200

@api.route('/cart', methods=['POST'])
def post_cart():
    body = request.json

    existente = Cart.query.filter_by(id_Product = body['id_Product'], id_Restaurant = body['id_Restaurant'], id_Order = None).first()

    if (existente):
        existente.amount = existente.amount + 1,
        existente.id_Product=body['id_Product'],
        existente.id_Restaurant=body['id_Restaurant'],
        existente.id_Order = body['id_Order'],

        db.session.commit()
    else :
        new_cart = Cart(
            amount=body['amount'],
            id_Product=body['id_Product'],
            id_Restaurant=body['id_Restaurant'],
            id_Order = body['id_Order']
        )

        db.session.add(new_cart)
        db.session.commit()

    return jsonify({"message": "Carrito creado con éxito"}), 200

@api.route('/cart/<int:id>', methods=['DELETE'])
def delete_cart(id):
    cart = Cart.query.get(id)

    if not cart:
        return jsonify({"message": "Carrito no encontrado"}), 404
    
    db.session.delete(cart)
    db.session.commit()

    return jsonify({"message": "Carrito eliminado con éxito"}), 200

@api.route('/restaurant', methods=['GET'])
def get_restaurant():
    all_restaurant = Restaurant.query.all()
    Restaurant_seriallize = list (map(lambda restaurant: restaurant.serialize(),all_restaurant))

    return jsonify(Restaurant_seriallize), 200

@api.route('/restaurant/<int:id>', methods=['PUT'])
def put_restaurant(id):
    restaurant = Restaurant.query.get(id)
    body = request.json

    if not restaurant:
        return jsonify({"message": "Restaurante no encontrado"}), 404
    
    restaurant.name = body["name"]
    restaurant.type = body["type"]
    restaurant.description = body["description"]
    restaurant.name_contact = body["name_contact"]
    restaurant.num_contact = body["num_contact"]
    
    db.session.commit()

    return jsonify({"message": "Restaurante modificado con éxito"}), 200

@api.route('/restaurant', methods=['POST'])
def post_restaurant():
    body = request.json
    restaurant = Restaurant.query.filter_by(name = body['name']).first()
    
    if restaurant:
        return jsonify({"msg": "Restaurante ya existe"}), 401

    new_restaurant = Restaurant(
        name=body["name"],
        password = body['password'],
        type=body["type"],
        description=body["description"],
        name_contact=body["name_contact"],
        num_contact=body["num_contact"]
    )
    db.session.add(new_restaurant)
    db.session.commit()

    return jsonify({"message": "Restaurante creado con éxito"}), 200

@api.route('/restaurant/<int:id>', methods=['DELETE'])
def delete_restaurant(id):

    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return jsonify({"message": "Restaurante no encontrado"}), 404

    db.session.delete(restaurant)
    db.session.commit()
    
    return jsonify({"message": "Restaurante eliminado con éxito"}), 200

@api.route('/sucursale', methods=['GET'])
@jwt_required()
def get_sucursale():
    restaurant_id = get_jwt_identity()
    print("solicitado")
    
    all_sucursale = Sucursale.query.filter_by( id_Restaurant = restaurant_id ).all()

    Sucursale_seriallize = [item.serialize() for item in all_sucursale]
    print(Sucursale_seriallize)
    return jsonify(Sucursale_seriallize), 200

@api.route('/sucursale/<int:id>', methods=['PUT'])
def put_sucursale(id):
    sucursale = Sucursale.query.get(id)
    body = request.json

    if not Sucursale:
        return jsonify({"message": "Sucursal no encontrado"}), 404
    
    sucursale.name = body['name']
    sucursale.type = body['type']
    sucursale.url_img = body["url_img"]
    sucursale.idu_img = body["idu_img"]
    sucursale.name_contact = body['name_contact']
    sucursale.num_contact = body['num_contact']
    sucursale.dir = body["dir"]
    sucursale.city = body["city"]
    sucursale.country = body["country"]
    sucursale.id_Restaurant = body['id_Restaurant']
    
    db.session.commit()

    return jsonify({"message": "Sucursal modificada con éxito"}), 200

@api.route('/sucursale', methods=['POST'])
def post_sucursale():
    body = request.json
    new_sucursale = Sucursale(
        name=body['name'],
        type=body["type"],
        name_contact=body["name_contact"],
        num_contact=body["num_contact"],
        dir=body["dir"],
        city=body["city"],
        country=body["country"],
        url_img = body["url_img"],
        idu_img = body["idu_img"],
        id_Restaurant = body['id_Restaurant']
    )

    db.session.add(new_sucursale)
    db.session.commit()

    return jsonify({"message": "Sucursal creada con éxito"}), 200

@api.route('/sucursale/<int:id>', methods=['DELETE'])
def delete_sucursale(id):

    sucursale = Sucursale.query.get(id)

    if not sucursale:
        return jsonify({"message": "Sucursal no encontrada"}), 404

    db.session.delete(sucursale)
    db.session.commit()
    
    return jsonify({"message": "Sucursal eliminada con éxito"}), 200

@api.route('/order', methods=['GET'])
@jwt_required()
def get_order(): 
    restaurant_id = get_jwt_identity()
    
    all_order = Order.query.filter_by( id_Restaurant = restaurant_id ).all()

    Order_seriallize = [item.serialize() for item in all_order]
    return jsonify(Order_seriallize), 200

@api.route('/all_order', methods=['GET'])
@jwt_required()
def get_all_order():
    all_order = Order.query.all()
    order_seriallize = [item.serialize() for item in all_order]
    order_with_info = []

    for item in order_seriallize:
        restaurant_id = item["id_Restaurant"]
        sucursale_id = item["id_Sucursale"]
        restaurant = Restaurant.query.get(restaurant_id)
        sucursale = Sucursale.query.get(sucursale_id)

        order_item = item.copy()

        order_item['restaurant_info'] = restaurant.serialize()
        order_item['sucursale_info'] = sucursale.serialize()
        order_with_info.append(order_item)

    return jsonify(order_with_info), 200

@api.route('/order/<id>', methods=['PUT'])
def put_order(id):
    order = Order.query.get(id)
    body = request.json

    if not order:
        return jsonify({"message": "Orden no encontrada"}), 404
    
    order.state = body['state']
    order.day_Date = body['day_Date']
    order.month_Date = body["month_Date"]
    order.year_Date = body["year_Date"]
    order.id_Restaurant = body['id_Restaurant']
    order.id_Sucursale = body['id_Sucursale']
    
    db.session.commit()

    return jsonify({"message": "Orden modificada con éxito"}), 200

@api.route('/order', methods=['POST'])
def post_order():
    body = request.json
    new_order = Order(
        id=body["id"],
        state= "Creada",
        day_Date=body["day_Date"],
        month_Date=body["month_Date"],
        year_Date=body["year_Date"],
        id_Restaurant=body["id_Restaurant"],
        id_Sucursale=body["id_Sucursale"],
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({"message": "Orden creada con éxito"}), 200

@api.route('/order/<id>', methods=['DELETE'])
def delete_order(id):

    order = Order.query.get(id)

    if not order:
        return jsonify({"message": "Orden no encontrada"}), 404

    db.session.delete(order)
    db.session.commit()
    
    return jsonify({"message": "Orden eliminada con éxito"}), 200
