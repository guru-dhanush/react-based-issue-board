import { memo } from "react";
import "./SettingItem.css";

interface SettingItemProps {
  children: React.ReactNode;
}

export const SettingItem = memo(({ children }: SettingItemProps) => {
  return <div className="setting-item">{children}</div>;
});
