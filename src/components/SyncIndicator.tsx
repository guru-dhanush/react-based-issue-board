import { useKanbanStore } from "../store/kanban.store";
import { formatDateTime } from "../utils/dateUtils";

export const SyncIndicator = () => {
  const lastSync = useKanbanStore((s) => s.lastSync);
  if (!lastSync) return null;

  return (
    <div className="sync-indicator">
      <span className="sync-time">
        Last synced at {formatDateTime(lastSync.toISOString())}
      </span>
    </div>
  );
};
