import { useBoardData } from "../../../hooks/board/useBoardData";
import { useBoardFilters } from "../../../hooks/board/useBoardFilters";
import { useBoardDnD } from "../../../hooks/board/useBoardDnD";
import { LoadingSpinner } from "../../common/ui/Loader";
import { BoardView } from "./BoardView";
import "./KanbanBoard.css";

export const BoardContainer = () => {
  const { loading } = useBoardData();
  const {
    IssuesPerColumn,
    filters,
    searchQuery,
    handleFilterApply,
    handleFilterReset,
    handleSearch,
  } = useBoardFilters();
  const { sensors, handleDragEnd } = useBoardDnD();

  if (loading) {
    return <LoadingSpinner size="lg" message="Loading board..." />;
  }

  return (
    <BoardView
      issuesPerColumn={IssuesPerColumn}
      filters={filters}
      searchQuery={searchQuery}
      onFilterApply={handleFilterApply}
      onFilterReset={handleFilterReset}
      onSearch={handleSearch}
      dndSensors={sensors}
      onDragEnd={handleDragEnd}
    />
  );
};
