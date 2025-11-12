import { useCallback } from "react";
import { useSettingsPage } from "../hooks/settings/useSettingsPage";
import {
  SettingsHeader,
  PollingSettings,
  UserExperienceSettings,
  SettingsActions,
} from "../components/settings";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

const SettingsPage = () => {
  const {
    tempSettings,
    saved,
    hasChanges,
    handleChange,
    handleSave,
    handleReset,
  } = useSettingsPage();

  const handleTogglePolling = useCallback(
    (enabled: boolean) => handleChange("enablePolling", enabled),
    [handleChange]
  );

  const handleChangeInterval = useCallback(
    (interval: number) => handleChange("pollingInterval", interval),
    [handleChange]
  );

  const handleChangeUndoTimeout = useCallback(
    (timeout: number) => handleChange("undoTimeout", timeout),
    [handleChange]
  );

  const handleChangeSearchDebounce = useCallback(
    (debounce: number) => handleChange("searchDebounce", debounce),
    [handleChange]
  );

  const handleChangeMaxRecentItems = useCallback(
    (max: number) => handleChange("maxRecentItems", max),
    [handleChange]
  );

  return (
    <ErrorBoundary>
      <div className="page-container">
        <div className="settings-page">
          <SettingsHeader />

          <div className="settings-content">
            <PollingSettings
              enablePolling={tempSettings.enablePolling}
              pollingInterval={tempSettings.pollingInterval}
              onTogglePolling={handleTogglePolling}
              onChangeInterval={handleChangeInterval}
            />

            <UserExperienceSettings
              undoTimeout={tempSettings.undoTimeout}
              searchDebounce={tempSettings.searchDebounce}
              maxRecentItems={tempSettings.maxRecentItems}
              onChangeUndoTimeout={handleChangeUndoTimeout}
              onChangeSearchDebounce={handleChangeSearchDebounce}
              onChangeMaxRecentItems={handleChangeMaxRecentItems}
            />
          </div>

          <SettingsActions
            hasChanges={hasChanges}
            saved={saved}
            onSave={handleSave}
            onReset={handleReset}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SettingsPage;
