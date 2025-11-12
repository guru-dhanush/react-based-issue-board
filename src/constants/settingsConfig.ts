import { Settings } from "../types";

export const UNDO_TIMEOUT = 5000;
export const SEARCH_DEBOUNCE = 500;
export const MAX_RECENT_ITEMS = 5;
export const MOCK_DB_KEY = "mock_db";

export const DEFAULT_SETTINGS: Settings = {
  undoTimeout: UNDO_TIMEOUT,
  searchDebounce: SEARCH_DEBOUNCE,
  maxRecentItems: MAX_RECENT_ITEMS,
};
