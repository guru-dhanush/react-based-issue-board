import { memo } from "react";

export const SettingsHeader = memo(() => {
  return (
    <div className="settings-header">
      <h1>Settings</h1>
      <p>Configure application behavior and preferences</p>
    </div>
  );
});
