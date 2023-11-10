from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Restaurantes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    tipo = db.Column(db.String(250), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    img = db.Column(db.String(250), unique=False, nullable=True)
    contacto = db.Column(db.String(250), unique=False, nullable=True)


    def __repr__(self):
        return f'<Restaurantes {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "tipo": self.tipo,
            "img": self.img,
            "contacto": self.contacto
        }

class Categorias(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    url = db.Column(db.String(320))
    idu = db.Column(db.String(320))
    
    def __repr__(self):
        return f'<Categorias {self.name}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "idu": self.idu
        }
    
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    img = db.Column(db.String(250), unique=False, nullable=True)
    idu = db.Column(db.String(250), unique=False, nullable=True)


    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "amount": self.amount,
            "img": self.img,
            "idu": self.idu
        }

class Carrito(db.Model):
    __tablename__ = 'carrito'
    id = db.Column(db.Integer, primary_key=True)
    cantidad = db.Column(db.Integer, unique=False, nullable=False)
    id_Producto = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    producto = db.relationship('Product')
    id_User = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')
    #id_Orden = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    #orden = db.relationship('Orden')

    def __repr__(self):
        return f'<User {self.email}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "cantidad": self.cantidad,
            "id_Producto": self.id_Producto,
            "id_User": self.id_User,
            #"id_Orden": self.id_Orden
        }
    
class Sucursales(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    tipo = db.Column(db.String(250), unique=False, nullable=False)
    direccion = db.Column(db.String(250), unique=False, nullable=False)
    contacto = db.Column(db.String(250), unique=False, nullable=True)


    def __repr__(self):
        return f'<Sucursales {self.name}>'
          
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "direccion": self.direccion,
            "tipo": self.tipo,
            "contacto": self.contacto
        }