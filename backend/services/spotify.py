import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

load_dotenv()

SCOPE = (
    "user-read-playback-state "
    "user-read-currently-playing "
    "user-modify-playback-state "
    "user-top-read "
    "user-read-recently-played"
)

sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIPY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    scope=SCOPE
)

def get_spotify_client(token: str):
    return spotipy.Spotify(auth=token)
