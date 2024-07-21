import os
from flask import Flask
from flask_migrate import Migrate
from extensions import db
from blueprint.user_blueprint import user_blueprint
from blueprint.task_blueprint import task_blueprint
from config import Config
from flask_cors import CORS
from models import User
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

SECRET_KEY = os.getenv('SECRET_KEY')

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
app.config['SECRET_KEY']= SECRET_KEY
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(user_blueprint,url_prefix='/user')
app.register_blueprint(task_blueprint,url_prefix='/task')
 
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
    
    