import { useEffect, useState } from "react";
import "./RecentlyPlayed.css";


export default function RecentlyPlayed({ accessToken }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTracks(data.items || []);
      })
      .catch(err => console.error(err));
  }, [accessToken]);

  return (
    <div className="recently-played-card">
  <h3>Recently Played</h3>
  <ul>
    {tracks.map((item, idx) => (
      <li key={item.played_at}>
        <span className="track-rank">{idx + 1}.</span>
        <img
          src={item.track.album.images[0]?.url}
          alt={item.track.name}
          className="track-thumb"
        />
        <div>
          <div className="track-name">{item.track.name}</div>
          <div className="track-artists">
            {item.track.artists.map(a => a.name).join(", ")}
          </div>
        </div>
        <div className="track-time">
          {new Date(item.played_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

function formatTime(isoTime) {
  const diff = Date.now() - new Date(isoTime).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  return `${Math.floor(hours / 24)} days ago`;
}
