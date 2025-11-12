import { Issue, IssueTransition } from "../types";

export interface IssuesState {
  issues: Record<string, Issue>;
  transitionHistory: Record<string, IssueTransition[]>;
}

export interface FiltersState {
  search: string;
  assignee: string | null;
  severity: number | null;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalIssues: number;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export interface UIState {
  loading: boolean;
  error: string | null;
  polling: {
    isPolling: boolean;
    lastSync: Date | null;
  };
}
