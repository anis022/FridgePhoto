from flask import Flask
from flask_cors import CORS
from routes.fridge import fridge_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(fridge_bp)

if __name__ == '__main__':
    app.run(debug=True)
