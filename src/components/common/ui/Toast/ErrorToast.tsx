import "./Toast.css";

interface ErrorToastProps {
  title: string;
  issueId?: string;
  issueTitle?: string;
  details?: string;
  errorMessage: string;
  revertInfo?: string;
}

export function ErrorToast({
  title,
  issueId,
  issueTitle,
  details,
  errorMessage,
  revertInfo,
}: ErrorToastProps) {
  return (
    <div className="error-toast">
      <div className="error-toast__title">{title}</div>

      {issueId && issueTitle && (
        <div className="error-toast__issue">
          <strong>Issue:</strong> #{issueId} - {issueTitle}
        </div>
      )}

      {details && <div className="error-toast__details">{details}</div>}

      <div className="error-toast__message">{errorMessage}</div>

      {revertInfo && <div className="error-toast__revert">{revertInfo}</div>}
    </div>
  );
}
