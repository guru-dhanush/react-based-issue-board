import { IssueStatus } from "../../types";
import { Button } from "../common/ui/Button";

interface IssueActionsProps {
  status: IssueStatus;
  canResolve: boolean;
  onResolve: () => void;
  loading: boolean;
  updating: boolean;
}

export const IssueActions = ({
  status,
  canResolve,
  onResolve,
  loading,
  updating,
}: IssueActionsProps) => {
  if (!canResolve) {
    return null;
  }

  return (
    <div className="issue-detail-actions">
      {status !== "Done" ? (
        <Button
          variant="primary"
          onClick={onResolve}
          loading={loading || updating}
          disabled={loading || updating}
        >
          Mark as Resolved
        </Button>
      ) : (
        <div className="resolved-badge">✓ Resolved</div>
      )}
    </div>
  );
};
