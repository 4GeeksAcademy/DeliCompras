import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Product, Category, Cart, Restaurant, Sucursale
from flask_jwt_extended import JWTManager

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    app.config["JWT_SECRET_KEY"] = "superpersu-secretcretse"
    jwt = JWTManager(app)

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Cart, db.session))
    admin.add_view(ModelView(Restaurant, db.session))
    admin.add_view(ModelView(Sucursale, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))