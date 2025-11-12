import { useCallback, useEffect } from "react";
import { useKanbanStore } from "../../store/kanban.store";
import { mockFetchIssues } from "../../utils/api";
import { MOCK_DB_KEY } from "../../constants/settingsConfig";
import { useShallow } from "zustand/react/shallow";

export const useBoardData = () => {
  const {
    issues,
    order,
    loading,
    setIssues,
    filters,
    searchQuery,
    setLastSync,
  } = useKanbanStore(useShallow((state) => state));

  const fetchData = useCallback(async () => {
    try {
      const data = await mockFetchIssues();
      if (Array.isArray(data) && data.length) {
        setIssues(data);
        setLastSync();
      }
    } catch (error) {
      console.log("Failed to fetch issues data");
    }
  }, [setIssues, setLastSync]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //simulate live update
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === MOCK_DB_KEY) {
        fetchData();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [fetchData]);

  return { issues, order, loading, filters, searchQuery };
};
