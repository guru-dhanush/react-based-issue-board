import { PaginationState } from "../types/context.types";
import {
  PaginationAction,
  PaginationActionType,
} from "../types/context-actions.types";

export const initialPaginationState: PaginationState = {
  currentPage: 1,
  pageSize: 20,
  totalIssues: 0,
  hasMore: false,
  isLoadingMore: false,
};

export function paginationReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case PaginationActionType.SET_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: action.payload,
      };

    case PaginationActionType.UPDATE_PAGINATION:
      const { page, hasMore, total } = action.payload;

      return {
        ...state,
        currentPage: page,
        hasMore,
        ...(total !== undefined && { totalIssues: total }),
        isLoadingMore: false,
      };

    default:
      return state;
  }
}
