import  { createContext, useContext, useReducer, ReactNode, useMemo } from "react";
import { UIState } from "../types/context.types";
import { UIActionType } from "../types/context-actions.types";
import { uiReducer, initialUIState } from "../reducers/uiReducer";

interface UIContextType {
  state: UIState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPolling: (polling: boolean) => void;
  updateLastSync: (date: Date | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const actions = useMemo(() => ({
    setLoading: (loading: boolean) => dispatch({ type: UIActionType.SET_LOADING, payload: loading }),
    setError: (error: string | null) => dispatch({ type: UIActionType.SET_ERROR, payload: error }),
    setPolling: (polling: boolean) => dispatch({ type: UIActionType.SET_POLLING, payload: polling }),
    updateLastSync: (date: Date | null) => dispatch({ type: UIActionType.UPDATE_LAST_SYNC, payload: date }),
  }), []);

  const contextValue = useMemo(() => ({ state, ...actions }), [state, actions]);
  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
}

function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
}

export const useLoadingState = (): [boolean, (loading: boolean) => void] => {
  const { state, setLoading } = useUI();
  return [state.loading, setLoading];
};


export const useLastSyncTime = (): Date | null => {
  const { state } = useUI();
  return state.polling.lastSync;
};

export { useUI };
