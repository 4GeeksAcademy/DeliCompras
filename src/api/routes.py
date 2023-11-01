"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Categorias
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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

    return jsonify({"message": "Categorias creado con éxito"}), 200

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