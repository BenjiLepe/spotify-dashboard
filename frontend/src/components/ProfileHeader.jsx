import "./ProfileHeader.css";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  const openProfile = () => {
    window.open(user.spotifyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="profile-header glass">
      <img
        src={user.image}
        alt={user.name}
        className="profile-avatar clickable"
        onClick={openProfile}
        title="Open Spotify profile"
      />

      <div className="profile-info">
        <span className="profile-label">Logged in as</span>
        <h2>{user.name}</h2>
        <span className="profile-followers">
          {user.followers.toLocaleString()} followers
        </span>
      </div>
    </div>
  );
}
