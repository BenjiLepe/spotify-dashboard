import "./Cards.css";

export default function TopTracks({ tracks }) {
  if (!tracks || tracks.length === 0) return <p>No top tracks found.</p>;

  return (
    <div className="glass top-tracks-card">
      <h3>Top Tracks</h3>
      <ul>
        {tracks.map((track, index) => (
          <li key={track.id}>
            <span className="track-rank">{index + 1}.</span>
            <img
              src={track.album.images[2]?.url || track.album.images[0]?.url}
              alt={track.name}
              className="track-thumb"
            />
            <span className="track-name">{track.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
