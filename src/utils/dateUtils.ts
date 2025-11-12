export function getTimestamp(dateString: string): number {
  return new Date(dateString).getTime();
}

export function getCurrentTimestamp(): number {
  return Date.now();
}

export function calculateDaysSince(dateString: string): number {
  const dateTime = getTimestamp(dateString);
  const nowTime = getCurrentTimestamp();
  const diffTime = Math.abs(nowTime - dateTime);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getRelativeTime(dateString: string): string {
  const dateTime = getTimestamp(dateString);
  const nowTime = getCurrentTimestamp();
  const diffMs = nowTime - dateTime;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return formatDate(dateString);
}
