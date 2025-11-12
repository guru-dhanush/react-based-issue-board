import { IssuesFilterSlice } from "./store/kanban.types";

export type IssueStatus = "Backlog" | "In Progress" | "Done";
export type IssuePriority = "low" | "medium" | "high";
export type ColumnMove = "fromColumn" | "toColumn";
export type Role = "admin" | "contributor";
export type Permission =
  | Permissions.MOVE_ISSUE
  | Permissions.UPDATE_STATUS
  | Permissions.RESOLVE_ISSUE;

export enum Permissions {
  MOVE_ISSUE = "move_issue",
  UPDATE_STATUS = "update_status",
  RESOLVE_ISSUE = "resolve_issue",
}

export interface User {
  name: string;
  role: Role;
}
export type IssuesByStatus = {
  [K in IssueStatus]: Issue[];
};

export type BoardFilters = IssuesFilterSlice["filters"];

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
  description?: string;
  rank?: number;
  score?: number;
  color?: string;
}

export interface Settings {
  undoTimeout: number;
  searchDebounce: number;
  maxRecentItems: number;
}
