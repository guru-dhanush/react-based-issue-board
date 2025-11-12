import { IssueStatus } from "../../types";
import { Button } from "../common/ui/Button";
import { PermissionGate } from "../common/PermissionGate";

interface IssueActionsProps {
  status: IssueStatus;
  onResolve: () => void;
  resolving: boolean;
}

export const IssueActions = ({
  status,
  onResolve,
  resolving,
}: IssueActionsProps) => {
  return (
    <div className="issue-detail-actions">
      <PermissionGate permission="resolve_issue">
        {status !== "Done" ? (
          <Button
            variant="primary"
            onClick={onResolve}
            loading={resolving}
            disabled={resolving}
          >
            Mark as Resolved
          </Button>
        ) : (
          <div className="resolved-badge">Resolved</div>
        )}
      </PermissionGate>
    </div>
  );
};
