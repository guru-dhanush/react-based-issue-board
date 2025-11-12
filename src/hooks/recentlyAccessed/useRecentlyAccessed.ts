import { useState, useEffect, useCallback } from "react";
import { Issue } from "../../types";
import { STORAGE_KEY_RECENT } from "../../constants/boardConfig";
import { storage } from "../../utils/storageUtils";
import { useSettings } from "../../context/SettingsContext";

export function useRecentlyAccessed() {
  const [recent, setRecent] = useState<Issue[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    const stored = storage.get<Issue[]>(STORAGE_KEY_RECENT);
    if (stored) {
      setRecent(stored.slice(0, settings.maxRecentItems));
    }
  }, [settings.maxRecentItems]);

  const trackAccess = useCallback((issue: Issue) => {
    setRecent((prev) => {
      const filtered = prev.filter((item) => item.id !== issue.id);
      const updated = [issue, ...filtered].slice(0, settings.maxRecentItems);

      storage.set(STORAGE_KEY_RECENT, updated);

      return updated;
    });
  }, [settings.maxRecentItems]);

  const clearRecent = useCallback(() => {
    setRecent([]);
    storage.remove(STORAGE_KEY_RECENT);
  }, []);

  return { recent, trackAccess, clearRecent };
}
