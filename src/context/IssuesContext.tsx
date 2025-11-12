import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { Issue } from "../types";
import { IssuesState } from "../types/context.types";
import { IssuesAction, IssuesActionType } from "../types/context-actions.types";
import { issuesReducer, initialIssuesState } from "../reducers/issuesReducer";

interface IssuesContextType {
  state: IssuesState;
  dispatch: React.Dispatch<IssuesAction>;
  updateIssue: (issueId: string, updates: Partial<Issue>) => void;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export function IssuesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(issuesReducer, initialIssuesState);

  const updateIssue = useCallback(
    (issueId: string, updates: Partial<Issue>) => {
      dispatch({
        type: IssuesActionType.UPDATE_ISSUE,
        payload: { issueId, updates },
      });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      updateIssue,
    }),
    [state, updateIssue]
  );

  return (
    <IssuesContext.Provider value={contextValue}>
      {children}
    </IssuesContext.Provider>
  );
}

function useIssues(): IssuesContextType {
  const context = useContext(IssuesContext);
  if (!context) throw new Error("useIssues must be used within IssuesProvider");
  return context;
}

export const useIssue = (id: string): Issue | undefined => {
  const { state } = useIssues();
  return useMemo(() => state.issues[id], [state.issues, id]);
};

export { useIssues };
