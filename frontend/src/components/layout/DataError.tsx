import { API_BASE_URL } from "../../api/client";

interface DataErrorProps {
  message: string;
  onRetry: () => void;
}

export default function DataError({ message, onRetry }: DataErrorProps) {
  return (
    <section className="dataErrorScreen">
      <div className="glassPanel dataErrorCard">
        <span className="dataErrorLabel">CONNECTION ERROR</span>
        <h1 className="dataErrorTitle">Could not load the profile</h1>
        <p className="dataErrorText">{message}</p>
        <p className="dataErrorHint">
          Make sure the API is running at {API_BASE_URL}.
        </p>
        <button type="button" className="dataErrorButton" onClick={onRetry}>
          Retry
        </button>
      </div>
    </section>
  );
}
