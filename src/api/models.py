from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User (db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Restaurant (db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    type = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    url_img = db.Column(db.String(250), unique=False, nullable=False)
    idu_img = db.Column(db.String(250), unique=False, nullable=False)
    name_contact = db.Column(db.String(250), unique=False, nullable=False)
    num_contact = db.Column(db.String(250), unique=False, nullable=False)


    def __repr__(self):
        return f'<Restaurant {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self.type,
            "url_img": self.url_img,
            "idu_img": self.idu_img,
            "name_contact": self.name_contact,
            "num_contact": self.num_contact
        }

class Category (db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    url_img = db.Column(db.String(320), unique=False, nullable=False)
    idu_img = db.Column(db.String(320), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Category {self.name}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url_img": self.url_img,
            "idu_img": self.idu_img
        }
    
class Product (db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    url_img = db.Column(db.String(250), unique=False, nullable=True)
    idu_img = db.Column(db.String(250), unique=False, nullable=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "amount": self.amount,
            "url_img": self.url_img,
            "idu_img": self.idu_img
        }

class Cart (db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    id_Product = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product')
    id_Restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    user = db.relationship('Restaurant')
    #id_Orden = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    #orden = db.relationship('Orden')

    def __repr__(self):
        return f'<Cart {self.id}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "id_Product": self.id_Product,
            "id_Restaurant": self.id_Restaurant,
            #"id_Orden": self.id_Orden
        }
    
class Sucursale (db.Model):
    __tablename__ = 'sucursale'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    type = db.Column(db.String(250), unique=False, nullable=False)
    address = db.Column(db.String(250), unique=False, nullable=False)
    name_contact = db.Column(db.String(250), unique=False, nullable=False)
    num_contact = db.Column(db.String(250), unique=False, nullable=False)
    url_img = db.Column(db.String(250), unique=False, nullable=True)
    idu_img = db.Column(db.String(250), unique=False, nullable=True)
    id_Restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant = db.relationship('Restaurant') 

    def __repr__(self):
        return f'<Sucursale {self.name}>'
          
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "type": self.type,
            "name_contact": self.name_contact,
            "num_contact": self.num_contact,
            "url_img": self.url_img,
            "idu_img": self.idu_img,
            "id_restaurant": self.id_Restaurant
        }