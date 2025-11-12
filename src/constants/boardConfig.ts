export type IssueStatus = "Backlog" | "In Progress" | "Done";

export const COLUMNS: IssueStatus[] = ["Backlog", "In Progress", "Done"];

export const COLUMN_LABELS: Record<IssueStatus, string> = {
  Backlog: "Backlog",
  "In Progress": "In Progress",
  Done: "Done",
};

export const STORAGE_KEY_RECENT = "kanban_recently_accessed";
export const MAX_TRANSITIONS_PER_ISSUE = 50;
