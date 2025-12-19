export default function PlaybackControls({ accessToken, onAction }) {
  const sendCommand = async (endpoint, method) => {
    if (!accessToken) {
      console.error("No access token yet!");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/${endpoint}?access_token=${accessToken}`,
        { method }
      );

      if (!res.ok) {
        console.error(`Error sending ${endpoint} command:`, res.statusText);
        return;
      }

      if (typeof onAction === "function") {
        onAction(endpoint);
      }
    } catch (err) {
      console.error(`Error with ${endpoint}:`, err);
    }
  };

  return (
    <div className="controls">
      <button onClick={() => sendCommand("previous", "POST")}>⏮️</button>
      <button onClick={() => sendCommand("play", "PUT")}>▶️</button>
      <button onClick={() => sendCommand("pause", "PUT")}>⏸️</button>
      <button onClick={() => sendCommand("next", "POST")}>⏭️</button>
    </div>
  );
}
