import { Issue, IssueStatus } from "../../types";
import { IssueMetadata } from "./IssueMetadata";
import { IssueDescription } from "./IssueDescription";
import { IssueTags } from "./IssueTags";
import { IssueActions } from "./IssueActions";
import { IssueDetailHeader } from "./IssueDetailHeader";

interface IssueDetailViewProps {
  issue: Issue;
  priorityInfo: {
    score: number;
    color: string;
  };
  canEdit: boolean;
  canResolve: boolean;
  onResolve: () => void;
  onUpdateStatus: (status: IssueStatus) => void;
  loading: boolean;
  updating: boolean;
}

export const IssueDetailView = ({
  issue,
  priorityInfo,
  canEdit,
  canResolve,
  onResolve,
  onUpdateStatus,
  loading,
  updating,
}: IssueDetailViewProps) => {
  return (
    <div className="page-container">
      <div className="issue-detail">
        <IssueDetailHeader />

        <div className="issue-detail-content">
          <IssueMainContent
            issue={issue}
            priorityInfo={priorityInfo}
            canEdit={canEdit}
            onUpdateStatus={onUpdateStatus}
            updating={updating}
          />

          <IssueActions
            status={issue.status}
            canResolve={canResolve}
            onResolve={onResolve}
            loading={loading}
            updating={updating}
          />
        </div>
      </div>
    </div>
  );
};

interface IssueMainContentProps {
  issue: Issue;
  priorityInfo: {
    score: number;
    color: string;
  };
  canEdit: boolean;
  updating: boolean;
  onUpdateStatus: (status: IssueStatus) => void;
}

const IssueMainContent = ({
  issue,
  priorityInfo,
  canEdit,
  onUpdateStatus,
  updating,
}: IssueMainContentProps) => {
  return (
    <div className="issue-detail-main">
      <div className="issue-detail-id">Issue #{issue.id}</div>
      <h1 className="issue-detail-title">{issue.title}</h1>

      <IssueMetadata
        status={issue.status}
        priority={issue.priority}
        severity={issue.severity}
        assignee={issue.assignee}
        createdAt={issue.createdAt}
        priorityInfo={priorityInfo}
        editable={canEdit}
        onUpdateStatus={onUpdateStatus}
        updating={updating}
      />

      <IssueDescription description={issue.description} />
      <IssueTags tags={issue.tags} />
    </div>
  );
};
