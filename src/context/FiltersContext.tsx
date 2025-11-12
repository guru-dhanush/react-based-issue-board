import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react";
import { FiltersState } from "../types/context.types";
import {
  FiltersAction,
  FiltersActionType,
} from "../types/context-actions.types";
import {
  filtersReducer,
  initialFiltersState,
} from "../reducers/filtersReducer";

interface FiltersContextType {
  state: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
  updateSearch: (search: string) => void;
  updateAssignee: (assignee: string | null) => void;
  updateSeverity: (severity: number | null) => void;
  resetFilters: () => void;
  activeFiltersCount: number;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filtersReducer, initialFiltersState);

  const actions = useMemo(
    () => ({
      updateSearch: (search: string) =>
        dispatch({ type: FiltersActionType.SET_SEARCH, payload: search }),
      updateAssignee: (assignee: string | null) =>
        dispatch({ type: FiltersActionType.SET_ASSIGNEE, payload: assignee }),
      updateSeverity: (severity: number | null) =>
        dispatch({ type: FiltersActionType.SET_SEVERITY, payload: severity }),
      resetFilters: () => dispatch({ type: FiltersActionType.RESET_FILTERS }),
    }),
    []
  );

  const activeFiltersCount = useMemo(
    () =>
      (state.search !== "" ? 1 : 0) +
      (state.assignee !== null ? 1 : 0) +
      (state.severity !== null ? 1 : 0),
    [state.search, state.assignee, state.severity]
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      ...actions,
      activeFiltersCount,
    }),
    [state, actions, activeFiltersCount, dispatch]
  );

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
}

function useFilters(): FiltersContextType {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters must be used within FiltersProvider");
  return context;
}

export const useSearchFilter = (): [string, (search: string) => void] => {
  const { state, updateSearch } = useFilters();
  return [state.search, updateSearch];
};

export const useAssigneeFilter = (): [
  string | null,
  (assignee: string | null) => void
] => {
  const { state, updateAssignee } = useFilters();
  return [state.assignee, updateAssignee];
};

export const useSeverityFilter = (): [
  number | null,
  (severity: number | null) => void
] => {
  const { state, updateSeverity } = useFilters();
  return [state.severity, updateSeverity];
};


export { useFilters };
