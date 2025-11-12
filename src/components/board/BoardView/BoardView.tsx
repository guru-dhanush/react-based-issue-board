import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useLoadingState } from "../../../context/UIContext";
import { usePermissions } from "../../../hooks/usePermissions";
import { LoadingSpinner } from "../../common/ui/Loader";
import { COLUMNS } from "../../../constants/boardConfig";
import "./BoardView.css";
import { useBoardFilters } from "../../../hooks/board/useBoardFilters";
import { useBoardData } from "../../../hooks/board/useBoardData";
import { useBoardDnd } from "../../../hooks/board/useBoardDnd";
import { BoardColumn } from "./Column/BoardColumn";
import { IssueCard } from "./Column/Card/IssueCard";
import { Permissions } from "../../../types";
import { useThrottle } from "../../../hooks/useThrottle";

const BoardView = () => {
  const [isLoading] = useLoadingState();
  const { can } = usePermissions();
  const { columnIssues } = useBoardFilters();
  const { fetchMoreData } = useBoardData();

  const { sensors, activeIssue, handleDragStart, handleDragEnd } = useBoardDnd({
    canMove: can,
  });

  const throttleDragEnd = useThrottle(handleDragEnd, 1000);
  const throttleDragStart = useThrottle(handleDragStart, 1000);

  if (isLoading) {
    return <LoadingSpinner size="md" message="Loading issues..." />;
  }
  console.log("columnIssues", columnIssues);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={throttleDragStart}
      onDragEnd={throttleDragEnd}
    >
      <div className="board-columns">
        {COLUMNS.map((column) => (
          <BoardColumn
            key={`board-column-${column}`}
            columnId={column}
            title={column}
            issues={columnIssues[column]}
            draggable={can(Permissions.MOVE_ISSUE)}
            onLoadMore={fetchMoreData}
          />
        ))}
      </div>
      {activeIssue && (
        <DragOverlay>
          <IssueCard issue={activeIssue} draggable />
        </DragOverlay>
      )}
    </DndContext>
  );
};

export { BoardView };
