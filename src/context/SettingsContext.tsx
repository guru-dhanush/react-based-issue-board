import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { storage } from "../utils/storageUtils";
import {
  POLLING_INTERVAL,
  UNDO_TIMEOUT,
  SEARCH_DEBOUNCE,
  MAX_RECENT_ITEMS,
  ENABLE_POLLING_DEFAULT,
  SETTINGS_STORAGE_KEY,
} from "../constants/settingsConfig";

interface Settings {
  pollingInterval: number;
  undoTimeout: number;
  searchDebounce: number;
  maxRecentItems: number;
  enablePolling: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

export const DEFAULT_SETTINGS: Settings = {
  pollingInterval: POLLING_INTERVAL,
  undoTimeout: UNDO_TIMEOUT,
  searchDebounce: SEARCH_DEBOUNCE,
  maxRecentItems: MAX_RECENT_ITEMS,
  enablePolling: ENABLE_POLLING_DEFAULT,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = storage.get<Settings>(SETTINGS_STORAGE_KEY);
    return stored || DEFAULT_SETTINGS;
  });

  useEffect(() => {
    storage.set(SETTINGS_STORAGE_KEY, settings);
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
