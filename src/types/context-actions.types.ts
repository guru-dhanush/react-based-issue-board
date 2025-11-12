import { Issue, MovePayload } from "../types";
import { FiltersState } from "./context.types";

export enum IssuesActionType {
  SET_ISSUES = "SET_ISSUES",
  UPDATE_ISSUE = "UPDATE_ISSUE",
  SYNC_ISSUES = "SYNC_ISSUES",
  SYNC_EXISTING_ISSUES = "SYNC_EXISTING_ISSUES",
  MOVE_ISSUE_OPTIMISTIC = "MOVE_ISSUE_OPTIMISTIC",
  UPDATE_TRANSITION_TOAST = "UPDATE_TRANSITION_TOAST",
  UNDO_TRANSITION = "UNDO_TRANSITION",
  REMOVE_TRANSITION = "REMOVE_TRANSITION",
}

export type IssuesAction =
  | { type: IssuesActionType.SET_ISSUES; payload: Record<string, Issue> }
  | { type: IssuesActionType.UPDATE_ISSUE; payload: { issueId: string; updates: Partial<Issue> } }
  | { type: IssuesActionType.SYNC_ISSUES; payload: { issues: Issue[] } }
  | { type: IssuesActionType.SYNC_EXISTING_ISSUES; payload: Issue[] }
  | { type: IssuesActionType.MOVE_ISSUE_OPTIMISTIC; payload: MovePayload; meta?: { timestamp: number } }
  | { type: IssuesActionType.UPDATE_TRANSITION_TOAST; payload: { issueId: string; transitionId: string; toastId: string | number } }
  | { type: IssuesActionType.UNDO_TRANSITION; payload: { issueId: string; transitionId: string } }
  | { type: IssuesActionType.REMOVE_TRANSITION; payload: { issueId: string; transitionId: string } };

export enum FiltersActionType {
  UPDATE_FILTERS = "UPDATE_FILTERS",
  RESET_FILTERS = "RESET_FILTERS",
  SET_SEARCH = "SET_SEARCH",
  SET_ASSIGNEE = "SET_ASSIGNEE",
  SET_SEVERITY = "SET_SEVERITY",
}

export type FiltersAction =
  | { type: FiltersActionType.UPDATE_FILTERS; payload: Partial<FiltersState> }
  | { type: FiltersActionType.RESET_FILTERS }
  | { type: FiltersActionType.SET_SEARCH; payload: string }
  | { type: FiltersActionType.SET_ASSIGNEE; payload: string | null }
  | { type: FiltersActionType.SET_SEVERITY; payload: number | null };

export enum PaginationActionType {
  SET_LOADING_MORE = "SET_LOADING_MORE",
  UPDATE_PAGINATION = "UPDATE_PAGINATION",
}

export type PaginationAction =
  | { type: PaginationActionType.SET_LOADING_MORE; payload: boolean }
  | { type: PaginationActionType.UPDATE_PAGINATION; payload: { page: number; hasMore: boolean; total?: number } };

export enum UIActionType {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_POLLING = "SET_POLLING",
  UPDATE_LAST_SYNC = "UPDATE_LAST_SYNC",
}

export type UIAction =
  | { type: UIActionType.SET_LOADING; payload: boolean }
  | { type: UIActionType.SET_ERROR; payload: string | null }
  | { type: UIActionType.SET_POLLING; payload: boolean }
  | { type: UIActionType.UPDATE_LAST_SYNC; payload: Date | null };


