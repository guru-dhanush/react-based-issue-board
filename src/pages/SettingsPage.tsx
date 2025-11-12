import { useSettingsPage } from "../hooks/settings/useSettingsPage";
import {
  SettingsHeader,
  // PollingSettings,
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

  return (
    <ErrorBoundary>
      <div className="page-container">
        <div className="settings-page">
          <SettingsHeader />

          <div className="settings-content">
            {/* <PollingSettings
              enablePolling={tempSettings.enablePolling}
              pollingInterval={tempSettings.pollingInterval}
              onTogglePolling={(enabled) =>
                handleChange("enablePolling", enabled)
              }
              onChangeInterval={(interval) =>
                handleChange("pollingInterval", interval)
              }
            /> */}

            <UserExperienceSettings
              undoTimeout={tempSettings.undoTimeout}
              searchDebounce={tempSettings.searchDebounce}
              maxRecentItems={tempSettings.maxRecentItems}
              onChangeUndoTimeout={(timeout) =>
                handleChange("undoTimeout", timeout)
              }
              onChangeSearchDebounce={(debounce) =>
                handleChange("searchDebounce", debounce)
              }
              onChangeMaxRecentItems={(max) =>
                handleChange("maxRecentItems", max)
              }
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
