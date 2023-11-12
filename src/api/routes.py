from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Category, Cart, Restaurant, Sucursale
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

@api.route("/register", methods=["POST"])
def post_register():
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

@api.route("/login", methods=["POST"])
def post_login():
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    
    user = Restaurant.query.filter_by(name=name, password=password).first()
    if User is None:
        return jsonify({"msg": "Bad username or password"}), 401
 
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    products_serialize = [product.serialize() for product in all_products]
    return jsonify(products_serialize), 200

@api.route('/products', methods=['POST'])
def post_product():
    body = request.json
    product = Product.query.filter_by(id=body['id']).first()

    if product:
        return jsonify({"message": "Producto no creado, el ID ya existe"}), 400
    
    new_product = Product(
        id=body['id'],
        name=body['name'],
        description=body['description'],
        price=body['price'],
        amount=body['amount'],
        url_img=body['url_img'],
        idu_img=body['idu_img']
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
        id=body['id'],
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
def get_carts():
    all_items = Cart.query.all()
    items_serialize = [item.serialize() for item in all_items]
    cart_with_product_info = []

    for item in items_serialize:
        product_id = item["id_Product"]
        product = Product.query.get(product_id)
        if product:
            item['product_info'] = product.serialize()
        cart_with_product_info.append(item)

    return jsonify(cart_with_product_info), 200

@api.route('/cart/<int:id>', methods=['PUT'])
def put_cart(id):
    cart = Cart.query.get(id)

    if not cart:
        return jsonify({"message": "Carrito no encontrado"}), 404
    
    body = request.json

    cart.amount = body['amount']
    cart.id_Producto = body['id_Product']
    cart.id_User = body['id_User']

    db.session.commit()

    return jsonify({"message": "Carrito modificado con éxito"}), 200

@api.route('/cart', methods=['POST'])
def post_cart():
    body = request.json
    cart = Cart.query.filter_by(id=body['id']).first()

    if cart:
        return jsonify({"message": "Carrito no creado, el ID ya existe"}), 400
    
    new_cart = Cart(
        id=body['id'],
        amount=body['amount'],
        id_Product=body['id_Product'],
        id_User=body['id_User']
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
    restaurant.url_img = body["url_img"]
    restaurant.idu_img = body["idu_img"]
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
        id=body["id"],
        name=body["name"],
        password = body['password'],
        type=body["type"],
        description=body["description"],
        url_img=body["url_img"],
        idu_img=body["idu_img"],
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
    sucursale.address = body['address']
    sucursale.type = body['type']
    sucursale.url_img = body["url_img"]
    sucursale.idu_img = body["idu_img"]
    sucursale.name_contact = body['name_contact']
    sucursale.num_contact = body['num_contact']
    sucursale.id_Restaurant = body['id_Restaurant']
    
    db.session.commit()

    return jsonify({"message": "Sucursal modificada con éxito"}), 200

@api.route('/sucursale', methods=['POST'])
def post_sucursale():
    body = request.json
    new_sucursale = Sucursale(
        id=body["id"],
        name=body['name'],
        type=body["type"],
        address=body["address"],
        name_contact=body["name_contact"],
        num_contact=body["num_contact"],
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