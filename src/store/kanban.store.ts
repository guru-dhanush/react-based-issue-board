import { create } from "zustand";
import { createIssuesFilterSlice } from "./slice/kanban.filters";
import { createIssueSlice } from "./slice/kanban.issues";
import { RootStore } from "./kanban.types";

export const useKanbanStore = create<RootStore>()((...a) => ({
  ...createIssuesFilterSlice(...a),
  ...createIssueSlice(...a),
}));
