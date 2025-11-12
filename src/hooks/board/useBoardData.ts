import { useEffect, useCallback, useMemo } from "react";
import { useIssues } from "../../context/IssuesContext";
import { usePagination } from "../../context/PaginationContext";
import { useUI } from "../../context/UIContext";
import { useSettings } from "../../context/SettingsContext";
import { usePolling } from "../usePolling";
import {
  fetchIssuesPaginated,
  syncExistingIssues,
} from "../../services/issueService";
import {
  IssuesActionType,
  PaginationActionType,
} from "../../types/context-actions.types";

export function useBoardData() {
  const issues = useIssues();
  const pagination = usePagination();
  const ui = useUI();
  const { settings } = useSettings();

  const issueIds = useMemo(
    () => Object.keys(issues.state.issues),
    [issues.state.issues]
  );

  const syncCallback = useCallback(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (issueIds.length === 0) return;

    try {
      const syncedIssues = await syncExistingIssues(issueIds);
      issues.dispatch({
        type: IssuesActionType.SYNC_EXISTING_ISSUES,
        payload: syncedIssues,
      });
      ui.updateLastSync(new Date());
    } catch (error) {
      console.error("Polling sync failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueIds, issues.dispatch, ui.updateLastSync]);

  // Polling setup
  const { pause: pausePolling, resume: resumePolling } = usePolling(
    syncCallback,
    settings.pollingInterval,
    {
      enabled: settings.enablePolling && ui.state.polling.isPolling,
      immediate: false,
    }
  );

  useEffect(() => {
    const loadInitialData = async () => {
      if (Object.keys(issues.state.issues).length > 0) return;
      ui.setLoading(true);
      try {
        const response = await fetchIssuesPaginated(1, 20);
        issues.dispatch({
          type: IssuesActionType.SYNC_ISSUES_PAGINATED,
          payload: { issues: response.data },
        });
        pagination.updatePagination(
          response.page,
          response.hasMore,
          response.total
        );
        pagination.dispatch({
          type: PaginationActionType.SET_PAGINATION,
          payload: { pageSize: response.pageSize },
        });
        ui.setError(null);
        ui.updateLastSync(new Date());
      } catch (error) {
        ui.setError(
          error instanceof Error ? error.message : "Failed to load issues"
        );
      } finally {
        ui.setLoading(false);
        if (settings.enablePolling) resumePolling();
      }
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreIssues = useCallback(
    async () => {
      if (pagination.state.isLoadingMore || !pagination.state.hasMore) return;
      pausePolling();
      pagination.setLoadingMore(true);
      try {
        const response = await fetchIssuesPaginated(
          pagination.state.currentPage + 1,
          pagination.state.pageSize
        );
        issues.dispatch({
          type: IssuesActionType.LOAD_MORE_ISSUES,
          payload: { issues: response.data },
        });
        pagination.updatePagination(response.page, response.hasMore);
        ui.updateLastSync(new Date());
      } catch (error) {
        ui.setError(
          error instanceof Error ? error.message : "Failed to load more issues"
        );
      } finally {
        pagination.setLoadingMore(false);
        if (settings.enablePolling) resumePolling();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      pagination.state,
      pagination.setLoadingMore,
      pagination.updatePagination,
      pausePolling,
      resumePolling,
      settings.enablePolling,
      issues.dispatch,
      ui.setError,
      ui.updateLastSync,
    ]
  );

  return {
    loadMoreIssues,
    pausePolling,
    resumePolling,
  };
}
