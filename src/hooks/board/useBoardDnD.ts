import { useCallback, createElement, ComponentType } from "react";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "react-toastify";
import { useKanbanStore } from "../../store/kanban.store";
import { PERMISSION_MESSAGES } from "../../constants/permissions";
import { mockUpdateIssue } from "../../utils/api";
import { IssueStatus, Permissions } from "../../types";
import { ErrorToast, UndoToast } from "../../components/common/ui/Toast";
import usePermissions from "../usePermissions";
import { DEFAULT_SETTINGS } from "../../constants/settingsConfig";

//drag issues
//support drag and drop logic
//optimistic ui update
//allow uundo within 5 seconds
export function useBoardDnD() {
  const moveIssueOptimistic = useKanbanStore((s) => s.moveIssueOptimistic);
  const updateTransitionToast = useKanbanStore((s) => s.updateTransitionToast);
  const undoTransition = useKanbanStore((s) => s.undoTransition);
  const removeTransition = useKanbanStore((s) => s.removeTransition);
  const getTransitionHistory = useKanbanStore.getState;

  const { can } = usePermissions();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );
  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const issueId = active.id as string;
      const fromColumn =
        (active.data.current?.status as IssueStatus) || undefined;
      const toColumn = over.id as IssueStatus;

      if (!fromColumn) return;
      if (fromColumn === toColumn) return;

      if (!can(Permissions.MOVE_ISSUE)) {
        toast.error(PERMISSION_MESSAGES.move_issue);
        return;
      }

      const transitionId = `transition-${issueId}-${Date.now()}`;
      const issueTitle = active?.data?.current?.title || issueId;
      moveIssueOptimistic(issueId, fromColumn, toColumn, transitionId);

      try {
        await mockUpdateIssue(issueId, { status: toColumn });

        const toastElement = createElement(UndoToast as ComponentType<any>, {
          duration: DEFAULT_SETTINGS.undoTimeout,
          message: `"${issueTitle}" moved from ${fromColumn} → ${toColumn}`,
          onUndo: async () => {
            const state = getTransitionHistory();
            const transitions = state.transitionHistory?.[issueId] || [];
            const transitionIndex = transitions.findIndex(
              (t) => t.transitionId === transitionId
            );

            if (transitionIndex === -1) {
              toast.error("Cannot undo - action not found");
              return;
            }

            undoTransition(issueId, transitionId);

            const invalidated = transitions.slice(transitionIndex);
            invalidated.forEach((t) => t.toastId && toast.dismiss(t.toastId));

            try {
              await mockUpdateIssue(issueId, { status: fromColumn });
              toast.success("Action undone");
            } catch (err) {
              console.error("Undo failed:", err);

              moveIssueOptimistic(
                issueId,
                fromColumn,
                toColumn,
                `undo-fallback-${Date.now()}`
              );

              toast.error(
                `Undo failed. Issue remains in "${toColumn}". Please try again.`
              );
            }
          },
        });

        const toastId = toast(toastElement, {
          autoClose: DEFAULT_SETTINGS.undoTimeout,
          closeButton: true,
          onClose: () => {
            removeTransition(issueId, transitionId);
          },
        });

        updateTransitionToast(issueId, transitionId, toastId);
      } catch (error: any) {
        undoTransition(issueId, transitionId);

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        const errorElement = createElement(ErrorToast as ComponentType<any>, {
          title: "Failed to Move Issue",
          issueId,
          issueTitle: issueTitle,
          details: `Attempted: ${fromColumn} → ${toColumn}`,
          errorMessage,
          revertInfo: `Issue reverted back to "${fromColumn}"`,
        });

        toast(errorElement, {
          autoClose: 5000,
          closeButton: true,
          style: { minWidth: "350px" },
        });
      }
    },
    [
      can,
      moveIssueOptimistic,
      updateTransitionToast,
      undoTransition,
      removeTransition,
      getTransitionHistory,
    ]
  );

  return { sensors, handleDragEnd };
}
