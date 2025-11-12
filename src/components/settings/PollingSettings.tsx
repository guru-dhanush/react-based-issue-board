import { memo } from "react";
import { Toggle } from "../common/ui/Toggle";
import { Input } from "../common/ui/Input";
import { SettingItem } from "../common/ui/SettingItem";

interface PollingSettingsProps {
  enablePolling: boolean;
  pollingInterval: number;
  onTogglePolling: (enabled: boolean) => void;
  onChangeInterval: (interval: number) => void;
}

export const PollingSettings = memo(
  ({
    enablePolling,
    pollingInterval,
    onTogglePolling,
    onChangeInterval,
  }: PollingSettingsProps) => {
    return (
      <div className="settings-section">
        <h2 className="settings-section-title">
          Interval Based Polling Configuration
        </h2>

        <SettingItem>
          <Toggle
            id="enablePolling"
            label="Enable Auto-Sync"
            description="Automatically sync issues in the background"
            checked={enablePolling}
            onChange={onTogglePolling}
          />
        </SettingItem>

        <SettingItem>
          <Input
            type="number"
            id="pollingInterval"
            label="Polling Interval"
            description="How often to sync data (in milliseconds)"
            value={pollingInterval}
            onChange={(e) => onChangeInterval(Number(e.target.value))}
            min="1000"
            step="1000"
            disabled={!enablePolling}
            suffix="ms"
          />
        </SettingItem>
      </div>
    );
  }
);
