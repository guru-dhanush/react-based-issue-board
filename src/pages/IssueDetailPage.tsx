import { useParams } from "react-router-dom";
import { ErrorBoundary } from "../components/common/ErrorBoundry/ErrorBoundary";
import { IssueNotFound } from "../components/IssueDetails/IssueNotFound";
import { IssueDetailContainer } from "../components/IssueDetails/IssueDetailContainer";

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ErrorBoundary>
      {!id ? (
        <IssueNotFound issueId={undefined} />
      ) : (
        <IssueDetailContainer id={id} />
      )}
    </ErrorBoundary>
  );
};

export default IssueDetailPage;
