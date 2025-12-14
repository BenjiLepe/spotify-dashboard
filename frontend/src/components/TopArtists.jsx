import "./Cards.css";

export default function TopArtists({ artists }) {
  if (!artists || artists.length === 0) return <p>No top artists found.</p>;

  return (
    <div className="glass top-artists-card">
      <h3>Top Artists</h3>
      <ul>
        {artists.map((artist, index) => (
          <li key={artist.id}>
            <span className="artist-rank">{index + 1}.</span>
            <img
              src={artist.images[2]?.url || artist.images[0]?.url}
              alt={artist.name}
              className="artist-thumb"
            />
            <span className="artist-name">{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
