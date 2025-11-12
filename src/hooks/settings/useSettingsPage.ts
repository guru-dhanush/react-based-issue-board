import { useState, useCallback } from "react";
import { useSettings, DEFAULT_SETTINGS } from "../../context/SettingsContext";

export function useSettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [tempSettings, setTempSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((key: keyof typeof settings, value: number | boolean) => {
    setTempSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    updateSettings(tempSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [tempSettings, updateSettings]);

  const handleReset = useCallback(() => {
    resetSettings();
    setTempSettings(DEFAULT_SETTINGS);
    setSaved(false);
  }, [resetSettings]);

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(tempSettings);

  return {
    tempSettings,
    saved,
    hasChanges,
    handleChange,
    handleSave,
    handleReset,
  };
}
