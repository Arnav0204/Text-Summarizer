from flask import Blueprint,request,jsonify
from extensions import jwt_authentication
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')


task_blueprint = Blueprint('task_bluprint',__name__)
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')
prompt = "summarize the given text"


@task_blueprint.route('/summarize',methods=["POST"])
@jwt_authentication(SECRET_KEY)
def summarize():
    data = request.json
    data = data.get('text')
    summary = model.generate_content([prompt, data])
    return jsonify({"summary":summary.text})

