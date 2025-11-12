import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecentlyAccessed } from "../recentlyAccessed/useRecentlyAccessed";
import { Permissions, IssueStatus, Issue } from "../../types";
import { mockFetchIssueByID, mockUpdateIssue } from "../../utils/api";
import usePermissions from "../usePermissions";
import { getPriorityInfo } from "../../utils/priorityCalculator";

export function useIssueDetail(issueId: string) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const { can } = usePermissions();
  const { trackAccess } = useRecentlyAccessed();

  const priorityInfo = useMemo(
    () => (issue ? getPriorityInfo(issue) : null),
    [issue]
  );

  const canEdit = can(Permissions.UPDATE_STATUS);
  const canResolve = can(Permissions.RESOLVE_ISSUE);

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      try {
        const fetched = await mockFetchIssueByID(issueId);
        setIssue(fetched);
        if (fetched) trackAccess(fetched);
      } catch (error) {
        toast.error("Failed to load issue");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId, trackAccess]);

  const updateStatus = useCallback(
    async (
      status: IssueStatus,
      successMessage: string,
      onSuccess?: () => void
    ) => {
      if (!issue) return;
      setUpdating(true);

      try {
        await mockUpdateIssue(issue.id, { status });
        setIssue((prev) => (prev ? { ...prev, status } : prev));
        toast.success(successMessage);
        onSuccess?.();
      } catch (err) {
        toast.error("Failed to update issue status");
      } finally {
        setUpdating(false);
      }
    },
    [issue]
  );

  const handleResolve = async () => {
    if (!canResolve) return;

    await updateStatus("Done" as IssueStatus, "Issue marked as resolved!", () =>
      setTimeout(() => navigate("/board"), 1000)
    );
  };

  const handleUpdateStatus = async (status: IssueStatus) => {
    if (!canEdit) return;
    await updateStatus(status, `Issue status updated to ${status}`);
  };

  return {
    issue,
    loading,
    updating,
    priorityInfo,
    canEdit,
    canResolve,
    handleResolve,
    handleUpdateStatus,
  };
}
