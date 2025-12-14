import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

function Root() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default Root;
