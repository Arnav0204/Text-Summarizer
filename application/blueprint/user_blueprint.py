from flask import Blueprint,jsonify,request,Response
import jwt as jwt_package
from datetime import datetime,timezone,timedelta
from extensions import db
from models import User
from  werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))


SECRET_KEY = os.getenv('SECRET_KEY')


user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route('/login',methods=["POST"])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    if not email or not password:
        return Response('Invalid credentials',status=401)
    
    user = User.query.filter_by(email=email).first()
   
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Incorrect credentials"}), 401
    
    token = jwt_package.encode({
            'id': user.id,
            'exp' :  datetime.now(timezone.utc) + timedelta(hours = 24)
    }, SECRET_KEY, algorithm='HS256')
        
    return jsonify({"token": token}),200
    



@user_blueprint.route('/signup',methods=["POST"])
def signup():
    data=request.json
    
    username = data['fullname']
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    
    if user:
        return jsonify({"message": "a user with this email already exists"}), 202
    
    user = User(
        username=username,
        email=email,
        password=generate_password_hash(password)
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message":"successfully registered"}), 201