

from flask import Flask
from flask_cors import CORS
from routes.fridge import fridge_bp

from routes.auth import auth_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(fridge_bp)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    load_dotenv()
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=True, port=port)