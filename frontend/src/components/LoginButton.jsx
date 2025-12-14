export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={handleLogin} style={{ fontSize: "16px", padding: "10px 20px" }}>
        Login with Spotify
      </button>
    </div>
  );
}
