import { DndContext, DragEndEvent, SensorDescriptor } from "@dnd-kit/core";
import { BoardFilters, IssuesByStatus } from "../../../types";
import { BoardControls } from "../BoardControls/BoardControls";
import { KanbanBoard } from "./KanbanBoard";
import { SyncIndicator } from "../../SyncIndicator";

interface BoardViewProps {
  issuesPerColumn: IssuesByStatus;
  filters: BoardFilters;
  searchQuery: string | null;
  onFilterApply: (filters: BoardFilters) => void;
  onFilterReset: () => void;
  onSearch: (query: string) => void;
  dndSensors: SensorDescriptor<any>[];
  onDragEnd: (event: DragEndEvent) => void;
}

export const BoardView = ({
  issuesPerColumn,
  filters,
  searchQuery,
  onFilterApply,
  onFilterReset,
  onSearch,
  dndSensors,
  onDragEnd,
}: BoardViewProps) => {
  return (
    <div className="board-page">
      <SyncIndicator />
      <BoardControls
        filters={filters}
        searchQuery={searchQuery}
        onFilterApply={onFilterApply}
        onFilterReset={onFilterReset}
        onSearch={onSearch}
      />

      <DndContext sensors={dndSensors} onDragEnd={onDragEnd}>
        <KanbanBoard issuesPerColumn={issuesPerColumn} />
      </DndContext>
    </div>
  );
};
