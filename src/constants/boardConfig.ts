import { IssueStatus } from "../types";

export const COLUMNS: IssueStatus[] = ["Backlog", "In Progress", "Done"];
export const MAX_TRANSITIONS_PER_ISSUE = 50;
export const STORAGE_KEY_RECENT = "kanban_recently_accessed";
export const severityOptions = [
  { value: "", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];
export const ISSUE_STATUSES = [
  {
    value: "Backlog",
    label: "Backlog",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Done",
    label: "Done",
  },
];
