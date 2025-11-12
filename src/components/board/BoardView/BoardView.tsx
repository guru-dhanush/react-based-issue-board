import { useCallback } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useIssues } from "../../../context/IssuesContext";
import { useLoadingState } from "../../../context/UIContext";
import { useLoadMoreState } from "../../../context/PaginationContext";
import { usePermissions } from "../../../hooks/usePermissions";
import { LoadingSpinner } from "../../common/ui/Loader";
import { COLUMNS, IssueStatus } from "../../../constants/boardConfig";
import "./BoardView.css";
import { useBoardFiltersOptimized } from "../../../hooks/board/useBoardFilters";
import { useBoardData } from "../../../hooks/board/useBoardData";
import { useBoardDnd } from "../../../hooks/board/useBoardDnd";
import { BoardColumn } from "./Column/BoardColumn";
import { IssueCard } from "./Column/Card/IssueCard";

const BoardView = () => {
  const { state: issuesState, updateIssue } = useIssues();
  const [isLoading] = useLoadingState();
  const [isLoadingMore, hasMore] = useLoadMoreState();
  const { can } = usePermissions();
  const { columnIssues } = useBoardFiltersOptimized();
  const { loadMoreIssues } = useBoardData();

  const { sensors, activeIssue, handleDragStart, handleDragEnd } = useBoardDnd({
    canMove: can,
  });

  const handleMoveIssue = useCallback(
    (issueId: string, newStatus: IssueStatus) => {
      updateIssue(issueId, { status: newStatus });
    },
    [updateIssue]
  );

  if (isLoading && Object.keys(issuesState.issues).length === 0) {
    return <LoadingSpinner size="md" message="Loading issues..." />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board-columns">
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column}
            columnId={column}
            title={column}
            issues={columnIssues[column]}
            draggable={can("move_issue")}
            onMoveIssue={handleMoveIssue}
            onLoadMore={loadMoreIssues}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
        ))}
      </div>
      <DragOverlay>
        {activeIssue && <IssueCard issue={activeIssue} draggable />}
      </DragOverlay>
    </DndContext>
  );
};

export { BoardView };
