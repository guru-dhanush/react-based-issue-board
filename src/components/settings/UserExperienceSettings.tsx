import { memo } from "react";
import { Input } from "../common/ui/Input";
import { SettingItem } from "../common/ui/SettingItem";

interface UserExperienceSettingsProps {
  undoTimeout: number;
  searchDebounce: number;
  maxRecentItems: number;
  onChangeUndoTimeout: (timeout: number) => void;
  onChangeSearchDebounce: (debounce: number) => void;
  onChangeMaxRecentItems: (max: number) => void;
}

export const UserExperienceSettings = memo(({
  undoTimeout,
  searchDebounce,
  maxRecentItems,
  onChangeUndoTimeout,
  onChangeSearchDebounce,
  onChangeMaxRecentItems,
}: UserExperienceSettingsProps) => {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">User Experience</h2>
      
      <SettingItem>
        <Input
          type="number"
          id="undoTimeout"
          label="Undo Timeout"
          description="Time window to undo actions (in milliseconds)"
          value={undoTimeout}
          onChange={(e) => onChangeUndoTimeout(Number(e.target.value))}
          min="1000"
          step="1000"
          suffix="ms"
        />
      </SettingItem>

      <SettingItem>
        <Input
          type="number"
          id="searchDebounce"
          label="Search Debounce"
          description="Delay before search executes (in milliseconds)"
          value={searchDebounce}
          onChange={(e) => onChangeSearchDebounce(Number(e.target.value))}
          min="100"
          step="100"
          suffix="ms"
        />
      </SettingItem>

      <SettingItem>
        <Input
          type="number"
          id="maxRecentItems"
          label="Max Recent Items"
          description="Number of recently accessed issues to display"
          value={maxRecentItems}
          onChange={(e) => onChangeMaxRecentItems(Number(e.target.value))}
          min="1"
          max="10"
          suffix="items"
        />
      </SettingItem>
    </div>
  );
});
