import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { Issue } from "../types";
import { IssuesState } from "../types/context.types";
import { IssuesAction, IssuesActionType } from "../types/context-actions.types";
import { issuesReducer, initialIssuesState } from "../reducers/issuesReducer";

interface IssuesContextType {
  state: IssuesState;
  dispatch: React.Dispatch<IssuesAction>;
  syncIssues: (issues: Issue[]) => void;
  syncExistingIssues: (issues: Issue[]) => void;
  updateIssue: (issueId: string, updates: Partial<Issue>) => void;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export function IssuesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(issuesReducer, initialIssuesState);

  const actions = useMemo(
    () => ({
      updateIssue: (issueId: string, updates: Partial<Issue>) => {
        
        dispatch({
          type: IssuesActionType.UPDATE_ISSUE,
          payload: { issueId, updates },
        });
      },
      syncIssues: (issues: Issue[]) => {
        dispatch({
          type: IssuesActionType.SYNC_ISSUES,
          payload: { issues },
        });
      },
      syncExistingIssues: (issues: Issue[]) => {
        dispatch({
          type: IssuesActionType.SYNC_EXISTING_ISSUES,
          payload: issues,
        });
      },
    }),
    []
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      ...actions,
    }),
    [state, actions]
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
