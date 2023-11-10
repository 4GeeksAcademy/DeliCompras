from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Categorias, Restaurantes, Sucursales
from api.utils import generate_sitemap, APIException

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

@api.route('/restaurantes', methods=['GET'])
def get_restaurantes():

    
    all_restaurantes = Restaurantes.query.all()
    Restaurantes_seriallize = list (map(lambda restaurante: restaurante.serialize(),all_restaurantes))

    return jsonify(Restaurantes_seriallize), 200

@api.route('/restaurantes', methods=['POST'])
def post_restaurantes():

    body = request.json
    new_restaurantes = Restaurantes(name=body['name'],tipo=body["tipo"],contacto=body["contacto"],description=body["description"],img=body["img"])
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

@api.route('/sucursales', methods=['GET'])
def get_sucursales():

    all_sucursales = Sucursales.query.all()
    Sucursales_seriallize = list (map(lambda sucursale: sucursale.serialize(),all_sucursales))

    return jsonify(Sucursales_seriallize), 200

@api.route('/sucursales', methods=['POST'])
def post_sucursales():

    body = request.json
    new_sucursales = Sucursales(name=body['name'],tipo=body["tipo"],contacto=body["contacto"])
    db.session.add(new_sucursales)
    db.session.commit()

    return jsonify({"message": "Sucursal creada con éxito"}), 200

@api.route('/sucursales/<int:id>', methods=['PUT'])
def put_sucursales(id):
    sucursales = Sucursales.query.get(id)
    body = request.json

    if not Sucursales:
        return jsonify({"message": "Sucursal no encontrado"}), 404
    
    if "name" in body:
        sucursales.name = body['name']
    if "direccion" in body:
        sucursales.direccion = body['direccion']
    if "tipo" in body:
        sucursales.tipo = body['tipo']
    if "contacto" in body:
        sucursales.contacto = body['contacto']
    
    db.session.commit()

    return jsonify({"message": "Sucursal modificada con éxito"}), 200

@api.route('/sucursales/<int:id>', methods=['DELETE'])
def delete_sucursales(id):

    sucursales = Sucursales.query.get(id)

    if not sucursales:
        return jsonify({"message": "Sucursal no encontrada"}), 404

    db.session.delete(sucursales)
    db.session.commit()
    
    return jsonify({"message": "Sucursal eliminada con éxito"}), 200
