from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Categorias
from api.utils import generate_sitemap, APIExceptio

api = Blueprint('api', __name__)

@api.route('/products', methods=['GET'])
def get_products():

    all_products = Product.query.all()
    products_seriallize = [product.serialize() for product in all_products]

    return jsonify(products_seriallize), 200

@api.route('/categorias', methods=['GET'])
def get_categorias():

    all_categorias = Categorias.query.all()
    categorias_seriallize = [categorias.serialize() for categorias in all_categorias]

    return jsonify(categorias_seriallize), 200

@api.route('/categorias', methods=['POST'])
def post_categorias():

    body = request.json
    new_categorias = Categorias(name=body['name'],image=body["image"])
    db.session.add(new_categorias)
    db.session.commit()

    return jsonify({"message": "Categorias creadas con éxito"}), 200

@api.route('/categorias/<int:id>', methods=['PUT'])
def put_categorias(id):
    categorias = Categorias.query.get(id)
    body = request.json

    if not categorias:
        return jsonify({"message": "Categorias no encontradas"}), 404
    
    if "name" in body:
        categorias.name = body['name']
    if "image" in body:
        categorias.image = body['image']
    
    db.session.commit()

    return jsonify({"message": "Categoria modificada con éxito"}), 200

@api.route('/categorias/<int:id>', methods=['DELETE'])
def delete_categorias(id):

    categorias = Categorias.query.get(id)

    if not categorias:
        return jsonify({"message": "Categoria no encontrada"}), 404

    db.session.delete(categorias)
    db.session.commit()
    
    return jsonify({"message": "Categoria eliminada con éxito"}), 200

@api.route('/product', methods=['POST'])
def post_product():
    body = request.json

    new_product = Product(
        id=body['id'],
        name=body['name'],
        description=body['description'],
        price=body['price'],
        amount=body['amount'],
        img=body['url'],
        idu=body['idu']
    )

    product = Product.query.filter_by(id=body['id']).first()
    if (product) :
        return jsonify({"message": "Prducto no creado, el ID ya existe"}), 400
    
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify({"message": "Producto creado con exito"}), 200

@api.route('/product/<id>', methods=['PUT'])
def put_product(id):
    product = Product.query.get(id)
    body = request.json

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    
    product.name = body['name']
    product.description = body['description']
    product.price = body['price']
    product.amount = body['amount']
    product.img=body['url']
    product.idu=body['idu']

    db.session.commit()
    
    return jsonify({"message": "Producto modificado con exito"}), 200

@api.route('/product/<id>', methods=['DELETE'])
def delete_product(id):

    product = Product.query.get(id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404

    db.session.delete(product)
    db.session.commit()
    
    return jsonify({"message": "Producto eliminado con éxito"}), 200