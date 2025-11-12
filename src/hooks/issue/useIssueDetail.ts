import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIssue } from "../../context/IssuesContext";
import { useLoadingState } from "../../context/UIContext";
import { usePermissions } from "../usePermissions";
import { useRecentlyAccessed } from "../recentlyAccessed/useRecentlyAccessed";
import { resolveIssue, updateIssue } from "../../services/issueService";
import { useIssues } from "../../context/IssuesContext";
import { IssuesActionType } from "../../types/context-actions.types";
import { Permissions, IssueStatus } from "../../types";
import { MOCK_DB_KEY } from "../../constants/settingsConfig";
import { useBoardData } from "../board/useBoardData";

export function useIssueDetail(issueId: string | undefined) {
  const navigate = useNavigate();
  const { dispatch } = useIssues();
  const { fetchData } = useBoardData();

  const issue = useIssue(issueId || "");
  const [isLoading] = useLoadingState();

  const { can } = usePermissions();
  const { trackAccess } = useRecentlyAccessed();
  const [resolving, setResolving] = useState(false);

  const loading = isLoading && !issue;

  useEffect(() => {
    if (issue) {
      trackAccess(issue);
    }
  }, [issue, trackAccess]);

  const handleResolve = useCallback(async () => {
    if (!issue || !can(Permissions.RESOLVE_ISSUE)) return;

    setResolving(true);
    try {
      await resolveIssue(issue.id);

      dispatch({
        type: IssuesActionType.UPDATE_ISSUE,
        payload: {
          issueId: issue.id,
          updates: { status: "Done" },
        },
      });

      toast.success("Issue marked as resolved!");
      setTimeout(() => navigate("/board"), 1000);
    } catch (error) {
      toast.error("Failed to resolve issue");
    } finally {
      setResolving(false);
    }
  }, [issue, can, dispatch, navigate]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === MOCK_DB_KEY) {
        fetchData();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line
  }, []);

  const handleUpdateStatus = useCallback(
    async (status: IssueStatus) => {
      if (!issue || !can(Permissions.UPDATE_STATUS)) return;

      try {
        await updateIssue(issue.id, { status });

        dispatch({
          type: IssuesActionType.UPDATE_ISSUE,
          payload: {
            issueId: issue.id,
            updates: { status },
          },
        });

        toast.success(`Issue status updated to ${status}`);
      } catch (error) {
        toast.error("Failed to update issue status");
      }
    },
    [issue, can, dispatch]
  );

  return {
    issue,
    isLoading: loading,
    resolving,
    handleResolve,
    handleUpdateStatus,
  };
}
