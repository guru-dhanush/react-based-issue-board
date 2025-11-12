export type IssueStatus = "Backlog" | "In Progress" | "Done";
export type IssuePriority = "low" | "medium" | "high";
export type Role = "admin" | "contributor";
export type Permission = "move_issue" | "update_status" | "resolve_issue";

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
  rank?: number;
  description?: string;
}

export const ISSUE_STATUSES = ["Backlog", "In Progress", "Done"] as const;

export interface IssueTransition {
  transitionId: string;
  timestamp: number;
  fromColumn: IssueStatus;
  toColumn: IssueStatus;
  toastId?: string | number;
}

export interface MovePayload {
  issueId: string;
  fromColumn: string;
  toColumn: string;
  actionId: string;
}

export interface User {
  name: string;
  role: Role;
}

export interface PriorityScore {
  issueId: string;
  score: number;
  createdAt: Date;
}

export interface PendingAction {
  id: string;
  type: string;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
}
