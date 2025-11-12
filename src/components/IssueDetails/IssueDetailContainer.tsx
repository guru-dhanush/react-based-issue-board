import { useIssueDetail } from "../../hooks/issue/useIssueDetail";
import { LoadingSpinner } from "../common/ui/Loader";
import { IssueDetailView } from "./IssueDetailView";
import { IssueNotFound } from "./IssueNotFound";
import "./IssueDeatils.css";

interface IssueDetailContainerProps {
  id: string;
}

export const IssueDetailContainer = ({ id }: IssueDetailContainerProps) => {
  const {
    issue,
    loading,
    updating,
    priorityInfo,
    canEdit,
    canResolve,
    handleResolve,
    handleUpdateStatus,
  } = useIssueDetail(id);

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading issue..." />;
  }

  if (!issue || !priorityInfo) {
    return <IssueNotFound issueId={id} />;
  }

  return (
    <IssueDetailView
      issue={issue}
      priorityInfo={priorityInfo}
      canEdit={canEdit}
      canResolve={canResolve}
      onResolve={handleResolve}
      onUpdateStatus={handleUpdateStatus}
      loading={loading}
      updating={updating}
    />
  );
};
