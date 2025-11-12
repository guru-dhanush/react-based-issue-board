import { memo } from "react";
import { Button } from "../common/ui/Button/Button";

interface SettingsActionsProps {
  hasChanges: boolean;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
}

export const SettingsActions = memo(({
  hasChanges,
  saved,
  onSave,
  onReset,
}: SettingsActionsProps) => {
  return (
    <div className="settings-actions">
      <Button
        variant="secondary"
        onClick={onReset}
        disabled={!hasChanges}
      >
        Reset to Defaults
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        disabled={!hasChanges}
      >
        {saved ? "✓ Saved" : "Save Changes"}
      </Button>
    </div>
  );
});
