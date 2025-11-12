import { UIState } from "../types/context.types";
import { UIAction, UIActionType } from "../types/context-actions.types";

export const initialUIState: UIState = {
  loading: false,
  error: null,
  polling: {
    isPolling: true,
    lastSync: null,
  },
};

export function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case UIActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case UIActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case UIActionType.SET_POLLING:
      return {
        ...state,
        polling: {
          ...state.polling,
          isPolling: action.payload,
        },
      };

    case UIActionType.UPDATE_LAST_SYNC:
      return {
        ...state,
        polling: {
          ...state.polling,
          lastSync: action.payload,
        },
      };

    default:
      return state;
  }
}
