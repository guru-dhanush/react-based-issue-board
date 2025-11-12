import { FiltersState } from "../types/context.types";
import { FiltersAction, FiltersActionType } from "../types/context-actions.types";

export const initialFiltersState: FiltersState = {
  search: "",
  assignee: null,
  severity: null,
};

export function filtersReducer(
  state: FiltersState,
  action: FiltersAction
): FiltersState {
  switch (action.type) {
    case FiltersActionType.UPDATE_FILTERS:
      return {
        ...state,
        ...action.payload,
      };

    case FiltersActionType.RESET_FILTERS:
      return initialFiltersState;

    case FiltersActionType.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case FiltersActionType.SET_ASSIGNEE:
      return {
        ...state,
        assignee: action.payload,
      };

    case FiltersActionType.SET_SEVERITY:
      return {
        ...state,
        severity: action.payload,
      };

    default:
      return state;
  }
}
