import { StateCreator } from "zustand";
import { IssuesFilterSlice } from "../kanban.types";
export const createIssuesFilterSlice: StateCreator<IssuesFilterSlice> = (
  set
) => ({
  filters: {
    severity: null,
    assignee: null,
  },
  searchQuery: null,

  updateFilter: (updates) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...updates,
      },
    })),

  resetFilter: () =>
    set(() => ({
      filters: {
        severity: null,
        assignee: null,
      },
      searchQuery: null,
    })),

  setSearch: (searchQuery) =>
    set(() => ({
      searchQuery,
    })),
});
