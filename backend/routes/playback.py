from flask import Blueprint, jsonify, request
import spotipy

playback_bp = Blueprint("playback", __name__)

def get_spotify_client():
    token = request.args.get("access_token")
    if not token:
        return None
    return spotipy.Spotify(auth=token)


@playback_bp.route("/current-track")
def current_track():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Missing access token"}), 401

    try:
        data = sp.current_playback()
        if not data:
            return jsonify({"item": None})
        return jsonify(data)
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


@playback_bp.route("/play", methods=["PUT"])
def play():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Missing access token"}), 401

    try:
        sp.start_playback()
        return jsonify({"status": "playing"})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


@playback_bp.route("/pause", methods=["PUT"])
def pause():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Missing access token"}), 401

    try:
        sp.pause_playback()
        return jsonify({"status": "paused"})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


@playback_bp.route("/next", methods=["POST"])
def next_track():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Missing access token"}), 401

    try:
        sp.next_track()
        return jsonify({"status": "skipped"})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


@playback_bp.route("/previous", methods=["POST"])
def previous_track():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Missing access token"}), 401

    try:
        sp.previous_track()
        return jsonify({"status": "previous"})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400
