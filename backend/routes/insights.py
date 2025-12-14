from flask import Blueprint, jsonify, request
from collections import Counter, defaultdict
from datetime import datetime
import spotipy

insights_bp = Blueprint("insights", __name__)

# ============================
# User Profile (NEW)
# ============================
@insights_bp.route("/me")
def get_user_profile():
    token = request.args.get("access_token")
    if not token:
        return jsonify({"error": "Missing access token"}), 401

    sp = spotipy.Spotify(auth=token)

    try:
        user = sp.current_user()
        return jsonify({
            "id": user["id"],
            "name": user["display_name"],
            "image": user["images"][0]["url"] if user["images"] else None,
            "followers": user["followers"]["total"],
            "spotifyUrl": user["external_urls"]["spotify"]
        })
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


# ============================
# Listening Insights
# ============================
@insights_bp.route("/listening-insights")
def listening_insights():
    token = request.args.get("access_token")
    if not token:
        return jsonify({"error": "Missing access token"}), 401

    sp = spotipy.Spotify(auth=token)

    try:
        recent = sp.current_user_recently_played(limit=50)
        items = recent.get("items", [])

        if not items:
            return jsonify({"error": "No listening history found"}), 404

        artist_counter = Counter()
        genre_counter = Counter()
        listening_by_day = defaultdict(int)
        artist_ids = set()

        for item in items:
            track = item["track"]

            for artist in track["artists"]:
                artist_ids.add(artist["id"])
                artist_counter[artist["name"]] += 1

            played_at = item["played_at"]
            day = datetime.fromisoformat(
                played_at.replace("Z", "")
            ).strftime("%A")
            listening_by_day[day] += 1

        # Fetch genres for artists
        artist_data = sp.artists(list(artist_ids))["artists"]
        for artist in artist_data:
            for genre in artist.get("genres", []):
                genre_counter[genre] += 1

        return jsonify({
            "totalTracksAnalyzed": len(items),
            "topArtists": [
                {"name": name, "plays": count}
                for name, count in artist_counter.most_common(5)
            ],
            "topGenres": [
                {"genre": genre, "count": count}
                for genre, count in genre_counter.most_common(5)
            ],
            "listeningByDay": dict(listening_by_day)
        })

    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


# ============================
# Top Artists (Time Range)
# ============================
@insights_bp.route("/top-artists")
def top_artists():
    token = request.args.get("access_token")
    time_range = request.args.get("time_range", "medium_term")

    if not token:
        return jsonify({"error": "Missing access token"}), 401

    sp = spotipy.Spotify(auth=token)

    try:
        results = sp.current_user_top_artists(
            limit=10,
            time_range=time_range
        )
        return jsonify({"items": results["items"]})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400


# ============================
# Top Tracks (Time Range)
# ============================
@insights_bp.route("/top-tracks")
def top_tracks():
    token = request.args.get("access_token")
    time_range = request.args.get("time_range", "medium_term")

    if not token:
        return jsonify({"error": "Missing access token"}), 401

    sp = spotipy.Spotify(auth=token)

    try:
        results = sp.current_user_top_tracks(
            limit=10,
            time_range=time_range
        )
        return jsonify({"items": results["items"]})
    except spotipy.SpotifyException as e:
        return jsonify({"error": str(e)}), 400
