import { useState, useEffect, useRef } from "react";
import PlaybackControls from "./PlaybackControls";
import "./Player.css";

export default function Player({ track, accessToken, onAction }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!track) {
      setProgress(0);
      return;
    }

    setProgress(track.progress_ms || 0);
    const startTime = Date.now() - (track.progress_ms || 0);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed, track.duration_ms));
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, [track?.id]);

  if (!track) return <div className="player-container">No track playing</div>;

  const progressRatio = track.duration_ms ? progress / track.duration_ms : 0;

  return (
    <div className="player-container">
      <img
        src={track.album?.images?.[0]?.url}
        alt={track.name}
        className="album-art"
      />

      <h3 className="track-name">{track.name}</h3>
      <p className="artist-name">{track.artists.map(a => a.name).join(", ")}</p>

      <div className="progress-bar">
        <div
          className="progress-filled"
          style={{ width: `${progressRatio * 100}%` }}
        ></div>
      </div>

      <PlaybackControls
        track={track}
        accessToken={accessToken}
        onAction={onAction}
      />
    </div>
  );
}
