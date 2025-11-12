import { useEffect, useCallback, useMemo } from "react";
import { useIssues } from "../../context/IssuesContext";
import { usePagination } from "../../context/PaginationContext";
import { useUI } from "../../context/UIContext";
import { useSettings } from "../../context/SettingsContext";

import {
  fetchIssuesPaginated,
  // syncExistingIssues,
} from "../../services/issueService";
import { MOCK_DB_KEY } from "../../constants/settingsConfig";
// import { usePolling } from "../usePolling";

export function useBoardData() {
  const issues = useIssues();
  const pagination = usePagination();
  const ui = useUI();
  const { settings } = useSettings();

  const issueIds = useMemo(
    () => Object.keys(issues.state.issues),
    [issues.state.issues]
  );

  // const syncCallback = useCallback(async () => {
  //   if (issueIds.length === 0) return;
  //   try {
  //     const syncedIssues = await syncExistingIssues(issueIds);
  //     console.log("syncedIssues", syncedIssues);
  //     issues.syncExistingIssues(syncedIssues);
  //     ui.updateLastSync(new Date());
  //   } catch (error) {
  //     console.error("Polling sync failed:", error);
  //   }
  // }, [issueIds, issues.syncExistingIssues]);

  // const { pause: pausePolling, resume: resumePolling } = usePolling(
  //   syncCallback,
  //   settings.pollingInterval,
  //   {
  //     enabled: settings.enablePolling && ui.state.polling.isPolling,
  //     immediate: false,
  //   }
  // );

  // Listen for changes to the mock "database" (localStorage)
  // This allows me to simulate multi tab realtime updates
  // When the MOCK_DB_KEY changes in another tab,
  // refetch data so UI stays in sync across all tabs

  //if updating are happeing too fast (<10ms apart) this may fail, so I believe websocket is best option for real time live updates
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

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      if (isLoadMore) {
        if (pagination.state.isLoadingMore || !pagination.state.hasMore) return;
        // pausePolling();
        pagination.setLoadingMore(true);
      } else {
        ui.setLoading(true);
      }

      try {
        const nextPage =
          isLoadMore && issueIds.length > 0
            ? pagination.state.currentPage + 1
            : pagination.state.currentPage;

        const response = await fetchIssuesPaginated(
          nextPage,
          pagination.state.pageSize
        );

        issues.syncIssues(response.data);
        pagination.updatePagination(
          response.page,
          response.hasMore,
          response.total
        );
        ui.setError(null);
        ui.updateLastSync(new Date());
      } catch (error) {
        ui.setError(
          error instanceof Error ? error.message : "Failed to load issues"
        );
      } finally {
        if (isLoadMore) {
          pagination.setLoadingMore(false);
        } else {
          ui.setLoading(false);
        }
        // if (settings.enablePolling) resumePolling();
      }
    },
    // eslint-disable-next-line
    [
      issueIds.length,
      pagination.state.isLoadingMore,
      pagination.state.hasMore,
      pagination.state.currentPage,
      pagination.state.pageSize,
      // pausePolling,
      // resumePolling,
      issues.syncIssues,
      pagination.setLoadingMore,
      pagination.updatePagination,
      ui.setLoading,
      ui.setError,
      ui.updateLastSync,
      settings.enablePolling,
    ]
  );

  const fetchInitialData = useCallback(() => fetchData(false), [fetchData]);
  const fetchMoreData = useCallback(() => fetchData(true), [fetchData]);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line
  }, []);

  return {
    fetchMoreData,
    fetchData,
  };
}

// Current implementation uses event based synchronization via localStorage storage events
// This enables real-time updates across browser tabs without continuous polling
// Interval based polling is available but commented out - uncomment lines 25-44 to enable
