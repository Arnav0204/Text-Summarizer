from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask import request,jsonify
import jwt as jwt
import re


db = SQLAlchemy()

# Define the bearer regex to check the Bearer scheme
bearer_regex = re.compile(r"^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$")

def jwt_authentication(secret_key):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Get the Authorization header from the request
            auth_header = request.headers.get('Authorization')
            # Check if the Authorization header is present and in the Bearer scheme
            if auth_header and bearer_regex.match(auth_header):
                # Extract the JWT from the Authorization header
                token = auth_header.split(' ')[1]
                try:
                    # Decode the JWT using the secret key
                    payload = jwt.decode(token, secret_key, algorithms=['HS256'])
                    # Get the user's claims from the JWT
                    claims = payload
                    # Use the user's claims to authorize the request
                    if claims:
                        return func(*args, **kwargs)
                    else:
                        return jsonify({'message': 'Unauthorized'}), 401
                except jwt.ExpiredSignatureError:
                    return jsonify({'message': 'Token has expired'}), 401
                except jwt.InvalidTokenError:
                    return jsonify({'message': 'Invalid token'}), 401
            else:
                return jsonify({'message': 'Unauthorized'}), 401
        return wrapper
    return decorator