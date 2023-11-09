"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurantes
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/restaurantes', methods=['GET'])
def get_restaurantes():

    #all_restaurants = Restaurantes.query.all()
    #Restaurantes_seriallize = [Restaurantes.serialize() for restaurantes in all_restaurants]

    all_restaurantes = Restaurantes.query.all()
    Restaurantes_seriallize = list (map(lambda restaurante: restaurante.serialize(),all_restaurantes))

    return jsonify(Restaurantes_seriallize), 200

@api.route('/restaurantes', methods=['POST'])
def post_restaurantes():

    body = request.json
    new_restaurantes = Restaurantes(name=body['name'],tipo=body["tipo"],contacto=body["contacto"])
    db.session.add(new_restaurantes)
    db.session.commit()

    return jsonify({"message": "Restaurante creado con éxito"}), 200

@api.route('/restaurantes/<int:id>', methods=['PUT'])
def put_restaurantes(id):
    restaurantes = Restaurantes.query.get(id)
    body = request.json

    if not Restaurantes:
        return jsonify({"message": "Restaurantes no encontrados"}), 404
    
    if "name" in body:
        restaurantes.name = body['name']
    if "image" in body:
        restaurantes.image = body['image']
    
    db.session.commit()

    return jsonify({"message": "Restaurante modificado con éxito"}), 200

@api.route('/restaurantes/<int:id>', methods=['DELETE'])
def delete_restaurantes(id):

    restaurantes = Restaurantes.query.get(id)

    if not restaurantes:
        return jsonify({"message": "Restaurante no encontrado"}), 404

    db.session.delete(restaurantes)
    db.session.commit()
    
    return jsonify({"message": "Restaurante eliminado con éxito"}), 200