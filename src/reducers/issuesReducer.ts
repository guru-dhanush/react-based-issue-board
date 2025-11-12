import { Issue, IssueStatus } from "../types";
import { IssuesState } from "../types/context.types";
import { IssuesAction, IssuesActionType } from "../types/context-actions.types";
import { MAX_TRANSITIONS_PER_ISSUE } from "../constants/boardConfig";

export const initialIssuesState: IssuesState = {
  issues: {},
  transitionHistory: {},
};

export function issuesReducer(
  state: IssuesState,
  action: IssuesAction
): IssuesState {
  switch (action.type) {
    case IssuesActionType.SYNC_ISSUES: {
      const { issues } = action.payload;
      const issuesById: Record<string, Issue> = { ...state.issues };

      issues.forEach((issue) => {
        issuesById[issue.id] = issue;
      });

      return {
        ...state,
        issues: issuesById,
      };
    }

    case IssuesActionType.MOVE_ISSUE_OPTIMISTIC: {
      const { payload } = action;
      const { issueId, fromColumn, toColumn, actionId } = payload;
      const issue = state.issues[issueId];
      if (!issue) return state;

      const updatedIssue = { ...issue, status: toColumn as IssueStatus };

      const existingTransitions = state.transitionHistory[issueId] || [];

      const newTransition = {
        transitionId: actionId,
        timestamp: Date.now(),
        fromColumn: fromColumn as IssueStatus,
        toColumn: toColumn as IssueStatus,
      };

      // Limit transitions to MAX_TRANSITIONS_PER_ISSUE
      const updatedTransitions = [...existingTransitions, newTransition].slice(
        -MAX_TRANSITIONS_PER_ISSUE
      );

      return {
        ...state,
        issues: { ...state.issues, [issueId]: updatedIssue },
        transitionHistory: {
          ...state.transitionHistory,
          [issueId]: updatedTransitions,
        },
      };
    }

    case IssuesActionType.UPDATE_ISSUE: {
      const { issueId, updates } = action.payload;
      const issue = state.issues[issueId];
      if (!issue) return state;

      const updated = { ...issue, ...updates };

      return {
        ...state,
        issues: { ...state.issues, [issueId]: updated },
      };
    }

    case IssuesActionType.UPDATE_TRANSITION_TOAST: {
      const { issueId, transitionId, toastId } = action.payload;
      const transitions = state.transitionHistory[issueId] || [];

      const updated = transitions.map((t) =>
        t.transitionId === transitionId ? { ...t, toastId } : t
      );

      return {
        ...state,
        transitionHistory: {
          ...state.transitionHistory,
          [issueId]: updated,
        },
      };
    }

    case IssuesActionType.UNDO_TRANSITION: {
      const { issueId, transitionId } = action.payload;
      const transitions = state.transitionHistory[issueId] || [];
      const index = transitions.findIndex(
        (t) => t.transitionId === transitionId
      );
      if (index === -1) return state;

      const transition = transitions[index];
      const issue = state.issues[issueId];

      if (!issue) return state;

      const reverted = { ...issue, status: transition.fromColumn };

      const validTransitions = transitions.slice(0, index);

      return {
        ...state,
        issues: { ...state.issues, [issueId]: reverted },
        transitionHistory: {
          ...state.transitionHistory,
          [issueId]: validTransitions,
        },
      };
    }

    case IssuesActionType.REMOVE_TRANSITION: {
      const { issueId, transitionId } = action.payload;
      const transitions = state.transitionHistory[issueId] || [];

      return {
        ...state,
        transitionHistory: {
          ...state.transitionHistory,
          [issueId]: transitions.filter((t) => t.transitionId !== transitionId),
        },
      };
    }

    case IssuesActionType.SYNC_EXISTING_ISSUES: {
      const syncedIssues = action.payload;
      let hasChanges = false;
      const updatedIssues = { ...state.issues };

      syncedIssues.forEach((issue: Issue) => {
        const existing = updatedIssues[issue.id];
        if (!existing || JSON.stringify(existing) !== JSON.stringify(issue)) {
          updatedIssues[issue.id] = issue;
          hasChanges = true;
        }
      });

      if (!hasChanges) return state;

      return {
        ...state,
        issues: updatedIssues,
      };
    }

    default:
      return state;
  }
}
