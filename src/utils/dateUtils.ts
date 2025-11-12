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
