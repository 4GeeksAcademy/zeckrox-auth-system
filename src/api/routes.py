"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    exist = User.query.filter_by( email=email ).one_or_none()
    if not exist:
        new_user = User( email=email, password=password, is_active=False)

        db.session.add(new_user)
        db.session.commit()

        return {"msg": f"Succesfully created user: {email} "}, 200
    
    else:
        return {"msg": f"{email} already exists"}, 500


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by( email=email, password=password ).one_or_none()
    if user is None:
          # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad email or password"}), 401
    
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token( identity=user.id )
    return jsonify({ "token": access_token, "user_id": user.id }) , 200



@api.route("/account", methods=["GET"])
@jwt_required()
def account():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email, "password": user.password }), 200