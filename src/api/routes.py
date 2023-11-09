from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Product, Categorias, Carrito
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    products_serialize = [product.serialize() for product in all_products]
    return jsonify(products_serialize), 200

@api.route('/categorias', methods=['GET'])
def get_categorias():
    all_categorias = Categorias.query.all()
    categorias_serialize = [categorias.serialize() for categorias in all_categorias]
    return jsonify(categorias_serialize), 200

@api.route('/categorias', methods=['POST'])
def post_categorias():
    body = request.json
    new_categorias = Categorias(
        name=body['name'],
        idu=body['idu'],
        url=body['url']
    )
    db.session.add(new_categorias)
    db.session.commit()
    return jsonify({"message": "Categorías creadas con éxito"}), 200

@api.route('/categorias/<int:id>', methods=['PUT'])
def put_categorias(id):
    categorias = Categorias.query.get(id)
    if not categorias:
        return jsonify({"message": "Categoría no encontrada"}), 404
    body = request.json
    categorias.name = body['name']
    categorias.url = body['url']
    categorias.idu = body['idu']
    db.session.commit()
    return jsonify({"message": "Categoría modificada con éxito"}), 200

@api.route('/categorias/<int:id>', methods=['DELETE'])
def delete_categorias(id):
    categorias = Categorias.query.get(id)
    if not categorias:
        return jsonify({"message": "Categoría no encontrada"}), 404
    db.session.delete(categorias)
    db.session.commit()
    return jsonify({"message": "Categoría eliminada con éxito"}), 200

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
        img=body['url'],
        idu=body['idu']
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
    product.img = body['url']
    product.idu = body['idu']
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

@api.route('/carrito', methods=['GET'])
def get_carrito():
    all_items = Carrito.query.all()
    items_serialize = [item.serialize() for item in all_items]
    carrito_with_product_info = []
    for item in items_serialize:
        product_id = item["id_Producto"]
        product = Product.query.get(product_id)
        if product:
            item['product_info'] = product.serialize()
        carrito_with_product_info.append(item)
    return jsonify(carrito_with_product_info), 200

@api.route('/carrito/<int:id>', methods=['PUT'])
def put_carrito(id):
    carrito = Carrito.query.get(id)
    if not carrito:
        return jsonify({"message": "Carrito no encontrado"}), 404
    body = request.json
    carrito.cantidad = body['cantidad']
    carrito.id_Producto = body['id_Producto']
    carrito.id_User = body['id_User']
    db.session.commit()
    return jsonify({"message": "Carrito modificado con éxito"}), 200

@api.route('/carrito', methods=['POST'])
def post_carrito():
    body = request.json
    carrito = Carrito.query.filter_by(id=body['id']).first()
    if carrito:
        return jsonify({"message": "Carrito no creado, el ID ya existe"}), 400
    new_carrito = Carrito(
        id=body['id'],
        cantidad=body['cantidad'],
        id_Producto=body['id_Producto'],
        id_User=body['id_User']
    )
    db.session.add(new_carrito)
    db.session.commit()
    return jsonify({"message": "Carrito creado con éxito"}), 200

@api.route('/carrito/<int:id>', methods=['DELETE'])
def delete_carrito(id):
    carrito = Carrito.query.get(id)
    if not carrito:
        return jsonify({"message": "Carrito no encontrado"}), 404
    db.session.delete(carrito)
    db.session.commit()
    return jsonify({"message": "Carrito eliminado con éxito"}), 200