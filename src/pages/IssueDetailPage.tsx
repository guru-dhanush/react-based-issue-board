import { useParams } from "react-router-dom";
import { useIssueDetail } from "../hooks/issue/useIssueDetail";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { LoadingSpinner } from "../components/common/ui/Loader";
import { IssueDetailHeader } from "../components/issueDetails/IssueDetailHeader";
import { IssueMetadata } from "../components/issueDetails/IssueMetadata";
import { IssueDescription } from "../components/issueDetails/IssueDescription";
import { IssueTags } from "../components/issueDetails/IssueTags";
import { IssueActions } from "../components/issueDetails/IssueActions";
import { IssueNotFound } from "../components/issueDetails/IssueNotFound";

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    issue,
    isLoading,
    resolving,
    handleResolve,
    handleUpdateStatus,
  } = useIssueDetail(id);

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading issue..." />;
  }

  if (!issue) {
    return <IssueNotFound issueId={id} />;
  }

  return (
    <ErrorBoundary>
      <div className="page-container">
        <div className="issue-detail">
          <IssueDetailHeader />

          <div className="issue-detail-content">
            <div className="issue-detail-main">
              <div className="issue-detail-id">Issue #{issue.id}</div>
              <h1 className="issue-detail-title">{issue.title}</h1>

              <IssueMetadata
                issue={issue}
                onUpdateStatus={handleUpdateStatus}
              />
              <IssueDescription description={issue.description} />
              <IssueTags tags={issue.tags} />
            </div>

            <IssueActions
              status={issue.status}
              onResolve={handleResolve}
              resolving={resolving}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default IssueDetailPage;
