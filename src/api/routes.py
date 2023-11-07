"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap

api = Blueprint('api', __name__)

@api.route('/products', methods=['GET'])
def get_products():

    all_products = Product.query.all()
    products_seriallize = [product.serialize() for product in all_products]

    return jsonify(products_seriallize), 200

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