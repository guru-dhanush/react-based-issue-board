import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createElement,
  ComponentType,
} from "react";
import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "react-toastify";
import { Issue, IssueStatus, Permission, Permissions } from "../../types";
import { IssuesActionType } from "../../types/context-actions.types";
import { UndoToast, ErrorToast } from "../../components/common/ui/Toast";
import { moveIssue } from "../../services/issueService";
import { useSettings } from "../../context/SettingsContext";
import { useIssues } from "../../context/IssuesContext";
import { PERMISSION_MESSAGES } from "../../constants/permissions";

interface UseBoardDndParams {
  canMove: (perm: Permission) => boolean;
}

export function useBoardDnd({ canMove }: UseBoardDndParams) {
  const { state, dispatch } = useIssues();
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const { settings } = useSettings();

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const issue = event.active.data.current?.issue as Issue;
    setActiveIssue(issue);
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveIssue(null);
      if (!over) return;

      const issueId = active.id as string;
      const toColumn = over.id as IssueStatus;
      const issue = stateRef.current.issues[issueId];
      if (!issue) return;

      const fromColumn = issue.status;
      if (fromColumn === toColumn) return;

      if (!canMove(Permissions.MOVE_ISSUE)) {
        toast.error(PERMISSION_MESSAGES.move_issue);
        return;
      }

      const transitionId = `transition-${issueId}-${Date.now()}`;

      //Immediate optimistic UI update
      dispatch({
        type: IssuesActionType.MOVE_ISSUE_OPTIMISTIC,
        payload: { issueId, fromColumn, toColumn, actionId: transitionId },
      });

      // Calling server BEFORE showing undo toast
      try {
        await moveIssue(issueId, toColumn);

        // If Successful  NOW show undo toast
        const toastId = toast(
          createElement(
            UndoToast as ComponentType<{
              message: string;
              onUndo: () => void;
              duration: number;
            }>,
            {
              duration: settings.undoTimeout,
              message: `"${issue.title}" moved from ${fromColumn} → ${toColumn}`,
              onUndo: async () => {
                const currentTransitions =
                  stateRef.current.transitionHistory[issueId] || [];
                const transitionIndex = currentTransitions.findIndex(
                  (t) => t.transitionId === transitionId
                );
                if (transitionIndex === -1) {
                  toast.error("Cannot undo - action not found");
                  return;
                }
                //Undo = optimistic
                dispatch({
                  type: IssuesActionType.UNDO_TRANSITION,
                  payload: { issueId, transitionId },
                });

                const invalidatedTransitions =
                  currentTransitions.slice(transitionIndex);
                invalidatedTransitions.forEach(
                  (t) => t.toastId && toast.dismiss(t.toastId)
                );

                try {
                  // Server undo call
                  await moveIssue(issueId, fromColumn);
                  toast.success("Action undone");
                } catch (err) {
                  console.error(err);

                  //Undo failed -- revert UI back to new state
                  dispatch({
                    type: IssuesActionType.MOVE_ISSUE_OPTIMISTIC,
                    payload: {
                      issueId,
                      fromColumn,
                      toColumn,
                      actionId: `undo-fallback-${Date.now()}`,
                    },
                  });

                  toast.error(
                    `Undo failed. Issue remains in "${toColumn}". Please try again.`
                  );
                }
              },
            }
          ),
          {
            autoClose: settings.undoTimeout,
            closeButton: true,
            onClose: () => {
              dispatch({
                type: IssuesActionType.REMOVE_TRANSITION,
                payload: { issueId, transitionId },
              });
            },
          }
        );

        // Store toastId for clearing if needed
        dispatch({
          type: IssuesActionType.UPDATE_TRANSITION_TOAST,
          payload: { issueId, transitionId, toastId },
        });
      } catch (error) {
        // Move failed -- revert optimistic update
        dispatch({
          type: IssuesActionType.UNDO_TRANSITION,
          payload: { issueId, transitionId },
        });

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.error(
          createElement(
            ErrorToast as ComponentType<{
              title: string;
              issueId: string;
              issueTitle: string;
              details: string;
              errorMessage: string;
              revertInfo: string;
            }>,
            {
              title: "Failed to Move Issue",
              issueId: issue.id,
              issueTitle: issue.title,
              details: `Attempted: ${fromColumn} → ${toColumn}`,
              errorMessage,
              revertInfo: `Issue reverted back to "${fromColumn}"`,
            }
          ),
          { autoClose: 5000, closeButton: true, style: { minWidth: "350px" } }
        );
      }
    },
    [dispatch, canMove, settings.undoTimeout, stateRef]
  );

  return { sensors, activeIssue, handleDragStart, handleDragEnd };
}
