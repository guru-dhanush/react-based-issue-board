import { Issue } from "../../types";
import { getPriorityInfo } from "../../utils/priorityCalculator";
import { formatDateTime } from "../../utils/dateUtils";

interface IssueMetadataProps {
  issue: Issue;
}

export const IssueMetadata = ({ issue }: IssueMetadataProps) => {
  const {
    score: priorityScore,
    label: priorityLabel,
    color: priorityColor,
  } = getPriorityInfo(issue);

  return (
    <div className="issue-detail-meta">
      <MetaItem label="Status">
        <span
          className={`status-badge status-${issue.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {issue.status}
        </span>
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
