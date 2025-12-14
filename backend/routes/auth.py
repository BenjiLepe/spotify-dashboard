from flask import Blueprint, redirect, request
from services.spotify import sp_oauth

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login")
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@auth_bp.route("/callback")
def callback():
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info["access_token"]

    return redirect(f"http://localhost:5173/?access_token={access_token}")
