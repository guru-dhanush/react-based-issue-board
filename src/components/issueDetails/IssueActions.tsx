import { IssueStatus, Permissions } from "../../types";
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
      <PermissionGate permission={Permissions.RESOLVE_ISSUE}>
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
