export default function PlaybackControls({ accessToken, onAction }) {
  const sendCommand = async (endpoint) => {
    if (!accessToken) {
      console.error("No access token yet!");
      return;
    }
    try {
      await fetch(`http://127.0.0.1:5000/${endpoint}?access_token=${accessToken}`, { method: "POST" });
      onAction();
    } catch (err) {
      console.error(`Error with ${endpoint}:`, err);
    }
  };

  return (
    <div className="controls">
      <button onClick={() => sendCommand("previous")}>⏮️</button>
      <button onClick={() => sendCommand("play")}>▶️</button>
      <button onClick={() => sendCommand("pause")}>⏸️</button>
      <button onClick={() => sendCommand("next")}>⏭️</button>
    </div>
  );
}
