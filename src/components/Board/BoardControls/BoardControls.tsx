import { FilterPanel } from "./FilterPanel";
import { SearchPanel } from "./SearchPanel";
import { RecentlyAccessed } from "../../RecentlyAccessed/RecentlyAccessed";
import { BoardFilters } from "../../../types";
import useAssigneeOptions from "../../../hooks/board/useAssigneeOptions";
import "./BoardControls.css";

interface BoardControlsProps {
  filters: BoardFilters;
  searchQuery: string | null;
  onFilterApply: (filters: BoardFilters) => void;
  onFilterReset: () => void;
  onSearch: (query: string) => void;
}

export const BoardControls = ({
  filters,
  searchQuery,
  onFilterApply,
  onFilterReset,
  onSearch,
}: BoardControlsProps) => {
  const assigneeOptions = useAssigneeOptions();

  return (
    <div className="board-controls">
      <div className="filter-panels">
        <SearchPanel value={searchQuery} onSearch={onSearch} />
        <FilterPanel
          filters={filters}
          assigneeOptions={assigneeOptions}
          onApply={onFilterApply}
          onReset={onFilterReset}
        />
      </div>
      <RecentlyAccessed />
    </div>
  );
};
