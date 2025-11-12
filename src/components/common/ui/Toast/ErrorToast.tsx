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
    <div className="error-toast-content">
      <div className="error-toast-title">{title}</div>

      {issueId && issueTitle && (
        <div className="error-toast-issue">
          <strong>Issue:</strong> #{issueId} - {issueTitle}
        </div>
      )}

      {details && <div className="error-toast-details">{details}</div>}

      <div className="error-toast-message">{errorMessage}</div>

      {revertInfo && <div className="error-toast-revert">{revertInfo}</div>}
    </div>
  );
}
