import { IssueStatus } from "../../types";
import { Select } from "../common/ui/Select";
import { ISSUE_STATUSES } from "../../constants/boardConfig";
import { formatDate } from "../../utils/dateUtils";

interface PriorityInfo {
  score: number;
  color: string;
}

interface IssueMetadataProps {
  status: IssueStatus;
  priority: string;
  severity: number;
  assignee: string;
  createdAt: string;
  priorityInfo: PriorityInfo;
  editable?: boolean;
  onUpdateStatus?: (status: IssueStatus) => void;
  updating: boolean;
}

export const IssueMetadata = ({
  status,
  priority,
  severity,
  assignee,
  createdAt,
  priorityInfo,
  editable = false,
  onUpdateStatus,
  updating,
}: IssueMetadataProps) => {
  return (
    <div className="issue-detail-meta">
      <StatusField
        status={status}
        editable={editable}
        onUpdateStatus={onUpdateStatus}
        updating={updating}
      />
      <PriorityField priority={priority} priorityInfo={priorityInfo} />
      <MetaItem label="Severity">
        <span className="severity-value">{severity}/5</span>
      </MetaItem>
      <MetaItem label="Assignee">
        <span className="assignee-name">{assignee}</span>
      </MetaItem>
      <MetaItem label="Created">
        <span className="date-value">{formatDate(createdAt)}</span>
      </MetaItem>
      <MetaItem label="Priority Score">
        <span className="score-value">{priorityInfo.score}</span>
      </MetaItem>
    </div>
  );
};

interface StatusFieldProps {
  status: IssueStatus;
  editable: boolean;
  onUpdateStatus?: (status: IssueStatus) => void;
  updating: boolean;
}

const StatusField = ({
  status,
  editable,
  onUpdateStatus,
  updating,
}: StatusFieldProps) => {
  return (
    <MetaItem label="Status">
      {editable && onUpdateStatus ? (
        <Select
          name="status"
          value={status}
          options={ISSUE_STATUSES}
          disabled={updating}
          onChange={(value) =>
            !updating && onUpdateStatus(value as IssueStatus)
          }
        />
      ) : (
        <span
          className={`status-badge status-${status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {status}
        </span>
      )}
    </MetaItem>
  );
};

interface PriorityFieldProps {
  priority: string;
  priorityInfo: PriorityInfo;
}

const PriorityField = ({ priority, priorityInfo }: PriorityFieldProps) => {
  return (
    <MetaItem label="Priority">
      <span
        className="priority-badge"
        style={{ backgroundColor: priorityInfo.color }}
      >
        {priority}
      </span>
    </MetaItem>
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
