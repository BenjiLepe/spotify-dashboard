from flask import Flask
from flask_cors import CORS
from routes import auth_bp, playback_bp, insights_bp

app = Flask(__name__)

CORS(
    app,
    origins=[
        "http://localhost:5173",        # local dev
        "https://YOUR-VERCEL-APP.vercel.app"  # production frontend
    ],
    supports_credentials=True
)

app.register_blueprint(auth_bp)
app.register_blueprint(playback_bp)
app.register_blueprint(insights_bp)

if __name__ == "__main__":
    app.run(debug=True)
