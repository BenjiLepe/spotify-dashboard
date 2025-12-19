import { useState, useEffect } from "react";
import Player from "./components/Player";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";
import TimeRangeToggle from "./components/TimeRangeToggle";
import ProfileHeader from "./components/ProfileHeader";
import RecentlyPlayed from "./components/RecentlyPlayed"; 
import "./App.css";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const fetchCurrentTrack = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/current-track?access_token=${accessToken}`
      );
      const data = await res.json();
      setCurrentTrack(data?.item || null);
    } catch (err) {
      console.error("Error fetching current track:", err);
    }
  };

  const fetchUser = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/me?access_token=${accessToken}`
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchTopTracks = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/top-tracks?access_token=${accessToken}&time_range=${timeRange}`
      );
      const data = await res.json();
      setTopTracks(data.items || []);
    } catch (err) {
      console.error("Error fetching top tracks:", err);
    }
  };


  const fetchTopArtists = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/top-artists?access_token=${accessToken}&time_range=${timeRange}`
      );
      const data = await res.json();
      setTopArtists(data.items || []);
    } catch (err) {
      console.error("Error fetching top artists:", err);
    }
  };


  useEffect(() => {
    if (!accessToken) return;

    fetchUser();
    fetchCurrentTrack();
    fetchTopTracks();
    fetchTopArtists();

    const interval = setInterval(fetchCurrentTrack, 5000);
    return () => clearInterval(interval);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    fetchTopTracks();
    fetchTopArtists();
  }, [timeRange]);

  return (
    <div className="app-container">
      {!accessToken && (
        <div className="login-container">
          <a href="http://127.0.0.1:5000/login">
            <button className="login-button">Login with Spotify</button>
          </a>
        </div>
      )}

      {accessToken && (
        <>
          {currentTrack?.album?.images?.[0]?.url && (
            <>
              <div
                className="bg-album"
                style={{
                  backgroundImage: `url(${currentTrack.album.images[0].url})`,
                }}
              />
              <div className="bg-overlay" />
            </>
          )}

          <div className="content">
            <TopArtists artists={topArtists} />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <ProfileHeader user={user} />
              <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
              <Player track={currentTrack} accessToken={accessToken} />
              <RecentlyPlayed accessToken={accessToken} />
            </div>

            <TopTracks tracks={topTracks} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
