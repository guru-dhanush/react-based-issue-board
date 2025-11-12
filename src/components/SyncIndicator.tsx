import { useLastSyncTime } from "../context/UIContext";
import { formatDateTime } from "../utils/dateUtils";

export const SyncIndicator = () => {
  const lastSync = useLastSyncTime();
  if (!lastSync) return null;

  return (
    <div className="sync-indicator">
      <span className="sync-time">
        Last synced at {formatDateTime(lastSync.toISOString())}
      </span>
    </div>
  );
};
