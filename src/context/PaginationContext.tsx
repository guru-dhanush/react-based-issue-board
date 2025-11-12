import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { PaginationState } from "../types/context.types";
import {
  PaginationAction,
  PaginationActionType,
} from "../types/context-actions.types";
import {
  paginationReducer,
  initialPaginationState,
} from "../reducers/paginationReducer";

interface PaginationContextType {
  state: PaginationState;
  dispatch: React.Dispatch<PaginationAction>;
  setLoadingMore: (loading: boolean) => void;
  updatePagination: (page: number, hasMore: boolean, total?: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );

  const actions = useMemo(
    () => ({
      setLoadingMore: (loading: boolean) =>
        dispatch({
          type: PaginationActionType.SET_LOADING_MORE,
          payload: loading,
        }),
      updatePagination: (page: number, hasMore: boolean, total?: number) =>
        dispatch({
          type: PaginationActionType.UPDATE_PAGINATION,
          payload: { page, hasMore, total },
        }),
    }),
    []
  );

  const contextValue = useMemo(
    () => ({ state, dispatch, ...actions }),
    [state, actions]
  );
  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
}

function usePagination(): PaginationContextType {
  const context = useContext(PaginationContext);
  if (!context)
    throw new Error("usePagination must be used within PaginationProvider");
  return context;
}

export const useLoadMoreState = (): [boolean, boolean] => {
  const { state } = usePagination();
  return [state.isLoadingMore, state.hasMore && !state.isLoadingMore];
};

export { usePagination };
