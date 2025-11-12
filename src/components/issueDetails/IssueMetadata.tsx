import { Issue, IssueStatus, ISSUE_STATUSES } from "../../types";
import { getPriorityInfo } from "../../utils/priorityCalculator";
import { formatDateTime } from "../../utils/dateUtils";
import { useMemo } from "react";
import { Select } from "../common/ui/Select/Select";
import { useUser } from "../../context/UserContext";
import { isAdmin } from "../../utils/permissionUtils";

interface IssueMetadataProps {
  issue: Issue;
  onUpdateStatus?: (status: IssueStatus) => void;
}

export const IssueMetadata = ({
  issue,
  onUpdateStatus,
}: IssueMetadataProps) => {
  const { currentUser } = useUser();
  const isAdminUser = isAdmin(currentUser);

  const {
    score: priorityScore,
    label: priorityLabel,
    color: priorityColor,
  } = useMemo(() => {
    return getPriorityInfo(issue);
  }, [issue]);

  const statusOptions = useMemo(
    () =>
      ISSUE_STATUSES.map((status) => ({
        value: status,
        label: status,
      })),
    []
  );

  return (
    <div className="issue-detail-meta">
      <MetaItem label="Status">
        {isAdminUser && onUpdateStatus ? (
          <Select
            name="status"
            value={issue.status}
            options={statusOptions}
            onChange={(value) => onUpdateStatus(value as IssueStatus)}
          />
        ) : (
          <span
            className={`status-badge status-${issue.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {issue.status}
          </span>
        )}
      </MetaItem>

      <MetaItem label="Priority">
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColor }}
        >
          {issue.priority} ({priorityLabel})
        </span>
      </MetaItem>

      <MetaItem label="Severity">
        <span className="severity-value">{issue.severity}/5</span>
      </MetaItem>

      <MetaItem label="Assignee">
        <span className="assignee-name">{issue.assignee}</span>
      </MetaItem>

      <MetaItem label="Created">
        <span className="date-value">{formatDateTime(issue.createdAt)}</span>
      </MetaItem>

      <MetaItem label="Priority Score">
        <span className="score-value">{priorityScore}</span>
      </MetaItem>
    </div>
  );
};

interface MetaItemProps {
  label: string;
  children: React.ReactNode;
}

const MetaItem = ({ label, children }: MetaItemProps) => {
  return (
    <div className="meta-item">
      <label>{label}</label>
      {children}
    </div>
  );
};
