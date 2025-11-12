import { AvailableFilters, Issue, IssueStatus } from "../types";

export interface IssuesAndOrder {
  issues: Record<string, Issue>;
  order: string[];
}

export interface UpdatePayload {
  status: {
    fromColumn: IssueStatus;
    toColumn: IssueStatus;
  };
}

export interface IssueTransition {
  transitionId: string;
  timestamp: number;
  fromColumn: IssueStatus;
  toColumn: IssueStatus;
  toastId?: string | number;
}

// Issue Slice / Kanban Slice
export interface IssueSlice extends IssuesAndOrder {
  loading: boolean;
  transitionHistory: Record<string, IssueTransition[]>;
  lastSync: Date | null;

  setIssues: (issues: Issue[]) => void;

  syncExistingIssues: (incoming: Issue[]) => void;

  moveIssueOptimistic: (
    issueId: string,
    fromColumn: IssueStatus,
    toColumn: IssueStatus,
    actionId: string
  ) => void;

  undoTransition: (issueId: string, transitionId: string) => void;

  removeTransition: (issueId: string, transitionId: string) => void;

  updateTransitionToast: (
    issueId: string,
    transitionId: string,
    toastId: string | number
  ) => void;

  setLastSync: () => void;
}

export interface IssuesFilterSlice {
  filters: Record<AvailableFilters, string | number | null>;
  searchQuery: string | null;
  updateFilter: (
    filters: Record<AvailableFilters, string | number | null>
  ) => void;
  resetFilter: () => void;
  setSearch: (searchQuery: string | null) => void;
}

export type RootStore = IssuesFilterSlice & IssueSlice;
