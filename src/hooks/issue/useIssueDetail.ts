import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIssue } from "../../context/IssuesContext";
import { useLoadingState } from "../../context/UIContext";
import { usePermissions } from "../usePermissions";
import { useRecentlyAccessed } from "../recentlyAccessed/useRecentlyAccessed";
import { resolveIssue } from "../../services/issueService";
import { useIssues } from "../../context/IssuesContext";
import { IssuesActionType } from "../../types/context-actions.types";

export function useIssueDetail(issueId: string | undefined) {
  const navigate = useNavigate();
  const { dispatch } = useIssues();

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
    if (!issue || !can("resolve_issue")) return;

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

  return {
    issue,
    isLoading: loading,
    resolving,
    handleResolve,
  };
}
