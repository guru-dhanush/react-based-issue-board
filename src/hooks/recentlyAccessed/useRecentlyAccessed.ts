import { useState, useEffect, useCallback } from "react";
import { Issue } from "../../types";
import { storage } from "../../utils/storage";
import { STORAGE_KEY_RECENT } from "../../constants/boardConfig";
import { DEFAULT_SETTINGS } from "../../constants/settingsConfig";

export function useRecentlyAccessed() {
  const [recent, setRecent] = useState<Issue[]>([]);

  useEffect(() => {
    const stored = storage.get<Issue[]>(STORAGE_KEY_RECENT);
    if (stored) {
      setRecent(stored.slice(0, DEFAULT_SETTINGS.maxRecentItems));
    }
  }, []);

  const trackAccess = useCallback((issue: Issue) => {
    setRecent((prev) => {
      const filtered = prev.filter((item) => item.id !== issue.id);
      const updated = [issue, ...filtered].slice(0, DEFAULT_SETTINGS.maxRecentItems);

      storage.set(STORAGE_KEY_RECENT, updated);

      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    storage.remove(STORAGE_KEY_RECENT);
  }, []);

  return { recent, trackAccess, clearRecent };
}
