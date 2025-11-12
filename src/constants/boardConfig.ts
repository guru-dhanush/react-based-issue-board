export type IssueStatus = "Backlog" | "In Progress" | "Done";

export const COLUMNS: IssueStatus[] = ["Backlog", "In Progress", "Done"];

export const COLUMN_LABELS: Record<IssueStatus, string> = {
  Backlog: "Backlog",
  "In Progress": "In Progress",
  Done: "Done",
};

export const STORAGE_KEY_RECENT = "kanban_recently_accessed";
export const MAX_TRANSITIONS_PER_ISSUE = 50;

export const severityOptions = [
  { value: "", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];
