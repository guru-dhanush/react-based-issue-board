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
import { Issue, IssueStatus, Permission } from "../../types";
import { IssuesActionType } from "../../types/context-actions.types";
import { UndoToast, ErrorToast } from "../../components/common/ui/Toast";
import { moveIssue } from "../../services/issueService";
import { useSettings } from "../../context/SettingsContext";
import { useIssues } from "../../context/IssuesContext";

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

      if (!canMove("move_issue")) {
        toast.error("You do not have permission to move issues");
        return;
      }

      const transitionId = `transition-${issueId}-${Date.now()}`;

      dispatch({
        type: IssuesActionType.MOVE_ISSUE_OPTIMISTIC,
        payload: { issueId, fromColumn, toColumn, actionId: transitionId },
      });

      const toastId = toast(
        createElement(
          UndoToast as ComponentType<{
            message: string;
            onUndo: () => void;
            duration: number;
          }>,
          {
            duration: settings.undoTimeout,
            message: `"${issue.title}" moved from ${fromColumn} to ${toColumn}`,
            onUndo: () => {
              const currentTransitions =
                stateRef.current.transitionHistory[issueId] || [];
              const transitionIndex = currentTransitions.findIndex(
                (t) => t.transitionId === transitionId
              );
              if (transitionIndex === -1) {
                toast.error("Cannot undo - action not found");
                return;
              }
              dispatch({
                type: IssuesActionType.UNDO_TRANSITION,
                payload: { issueId, transitionId },
              });
              const invalidatedTransitions =
                currentTransitions.slice(transitionIndex);
              invalidatedTransitions.forEach(
                (t) => t.toastId && toast.dismiss(t.toastId)
              );
              toast.success("Action undone");
            },
          }
        ),
        {
          autoClose: settings.undoTimeout,
          closeButton: true,
          onClose: () =>
            dispatch({
              type: IssuesActionType.REMOVE_TRANSITION,
              payload: { issueId, transitionId },
            }),
        }
      );

      dispatch({
        type: IssuesActionType.UPDATE_TRANSITION_TOAST,
        payload: { issueId, transitionId, toastId },
      });

      try {
        await moveIssue(issueId, toColumn);
      } catch (error) {
        dispatch({
          type: IssuesActionType.UNDO_TRANSITION,
          payload: { issueId, transitionId },
        });
        toast.dismiss(toastId);
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
              revertInfo: `Issue automatically reverted to "${fromColumn}"`,
            }
          ),
          { autoClose: 5000, closeButton: true, style: { minWidth: "350px" } }
        );
      }
    },
    [dispatch, canMove, settings.undoTimeout]
  );

  return { sensors, activeIssue, handleDragStart, handleDragEnd };
}
