"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Trademark, Orders, Admin
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/trademarks', methods=['GET'])
def get_trademarks():

    all_trademarks = Trademark.query.all()
    trademark_seriallize = [Trademark.serialize() for Trademark in all_trademarks]

    return jsonify(trademark_seriallize), 200

@api.route('/trademarks', methods=['POST'])
def post_trademarks():

    body = request.json
    new_trademarks = Orders(id=body['id'],name=body['name'],description=body['description'],price=body['price'],amount=body['amount'])
    db.session.add(new_trademarks)
    db.session.commit()
    
    return jsonify({"message": "Producto creado con éxito"}), 200

@api.route('/trademarks/<id>', methods=['PUT'])
def put_trademarks(id):
    trademark = Trademark.query.get(id)
    body = request.json

    if not trademark:
        return jsonify({"message": "Marca no encontrado"}), 404
    
    trademark.name = body['name']
    trademark.description = body['description']
    trademark.category = body['category']
    trademark.products = body['products']

    db.session.commit()
    
    return jsonify({"message": "Marca modificada con éxito"}), 200

@api.route('/trademarks/<id>', methods=['DELETE'])
def delete_product(id):

    trademark = Trademark.query.get(id)

    if not trademark:
        return jsonify({"message": "Marca no encontrado"}), 404

    db.session.delete(trademark)
    db.session.commit()
    
    return jsonify({"message": "Marca eliminada con éxito"}), 200


@api.route('/admin', methods=['GET'])
def get_admins():

    all_admin = Admin.query.all()
    admin_serialize = [Admin.serialize() for Admin in all_admin]

    return jsonify(admin_serialize), 200

@api.route('/admin', methods=['POST'])
def post_admins():

    body = request.json
    new_admin = Orders(id=body['id'],name=body['name'],description=body['description'],price=body['price'],amount=body['amount'])
    db.session.add(new_admin)
    db.session.commit()
    
    return jsonify({"message": "Admin creado con éxito"}), 200

@api.route('/admin/<id>', methods=['PUT'])
def put_admin(id):
    admin = Admin.query.get(id)
    body = request.json

    if not admin:
        return jsonify({"message": "Marca no encontrado"}), 404
    
    admin.name = body['name']
    admin.description = body['description']
    admin.category = body['category']
    admin.products = body['products']

    db.session.commit()
    
    return jsonify({"message": "Marca modificada con éxito"}), 200

@api.route('/admin/<id>', methods=['DELETE'])
def delete_admin(id):

    admin = Admin.query.get(id)

    if not admin:
        return jsonify({"message": "Admin no encontrado"}), 404

    db.session.delete(admin)
    db.session.commit()
    
    return jsonify({"message": "Admin eliminada con éxito"}), 200