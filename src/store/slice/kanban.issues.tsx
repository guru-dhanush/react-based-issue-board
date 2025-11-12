import { StateCreator } from "zustand";
import { Issue, IssueStatus } from "../../types";
import { MAX_TRANSITIONS_PER_ISSUE } from "../../constants/boardConfig";
import { IssueSlice } from "../kanban.types";

export const createIssueSlice: StateCreator<IssueSlice> = (set, get) => ({
  issues: {},
  transitionHistory: {},
  order: [],
  loading: false,
  lastSync: null,

  setIssues: (issues) => {
    const updatedState = issues.reduce<{
      issues: Record<string, Issue>;
      order: string[];
    }>(
      (acc, val) => {
        acc.issues[val.id] = val;
        acc.order.push(val.id);
        return acc;
      },
      {
        issues: {},
        order: [],
      }
    );

    set((state) => ({
      ...state,
      ...updatedState,
    }));
  },

  moveIssueOptimistic: (issueId, fromColumn, toColumn, actionId) => {
    const { issues, transitionHistory } = get();
    const issue = issues[issueId];
    if (!issue) return;

    // update issue column
    const updatedIssue = { ...issue, status: toColumn as IssueStatus };

    // track transition history
    const existing = transitionHistory[issueId] || [];
    const newTransition = {
      transitionId: actionId,
      timestamp: Date.now(),
      fromColumn,
      toColumn,
    };

    const updatedTransitions = [...existing, newTransition].slice(
      -MAX_TRANSITIONS_PER_ISSUE
    );

    set({
      issues: { ...issues, [issueId]: updatedIssue },
      transitionHistory: {
        ...transitionHistory,
        [issueId]: updatedTransitions,
      },
    });
  },

  updateTransitionToast: (issueId, transitionId, toastId) => {
    const { transitionHistory } = get();
    const transitions = transitionHistory[issueId] || [];

    const updated = transitions.map((t) =>
      t.transitionId === transitionId ? { ...t, toastId } : t
    );

    set({
      transitionHistory: {
        ...transitionHistory,
        [issueId]: updated,
      },
    });
  },

  undoTransition: (issueId, transitionId) => {
    const { transitionHistory, issues } = get();
    const transitions = transitionHistory[issueId] || [];

    const index = transitions.findIndex((t) => t.transitionId === transitionId);
    if (index === -1) return;

    const transition = transitions[index];
    const issue = issues[issueId];
    if (!issue) return;

    // revert issue column
    const reverted = {
      ...issue,
      status: transition.fromColumn,
    };

    const remaining = transitions.slice(0, index);

    set({
      issues: { ...issues, [issueId]: reverted },
      transitionHistory: {
        ...transitionHistory,
        [issueId]: remaining,
      },
    });
  },

  removeTransition: (issueId, transitionId) => {
    const { transitionHistory } = get();
    const transitions = transitionHistory[issueId] || [];

    set({
      transitionHistory: {
        ...transitionHistory,
        [issueId]: transitions.filter((t) => t.transitionId !== transitionId),
      },
    });
  },

  syncExistingIssues: (incomingIssues) => {
    const { issues } = get();
    let hasChanges = false;
    const updated = { ...issues };

    incomingIssues.forEach((issue) => {
      const existing = updated[issue.id];
      if (!existing || JSON.stringify(existing) !== JSON.stringify(issue)) {
        updated[issue.id] = issue;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      set({ issues: updated });
    }
  },

  setLastSync: () => {
    set((state) => ({
      ...state,
      lastSync: new Date(),
    }));
  },
});
