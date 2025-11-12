import { useState } from "react";
import { SearchBar } from "./SearchBar/SearchBar";
import { useSearchFilter, useAssigneeFilter, useSeverityFilter } from "../../../context/FiltersContext";
import { useIssues } from "../../../context/IssuesContext";
import { Button } from "../../common/ui/Button";
import "./ControlBar.css";
import { FilterControls } from "./Filters/Filters";
import { RecentlyAccessed } from "../../recentlyAccessed/RecentlyAccessed";

const ControlBar = () => {
  const [, updateSearch] = useSearchFilter();
  const [assigneeFilter, updateAssignee] = useAssigneeFilter();
  const [severityFilter, updateSeverity] = useSeverityFilter();
  const { state: issuesState } = useIssues();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="controlbar-container">
      <SearchBar onSearch={updateSearch} />

      <div className="controlbar-filters">
        <FilterControls
          issues={issuesState.issues}
          onFilterAssignee={updateAssignee}
          onFilterSeverity={updateSeverity}
          currentAssignee={assigneeFilter}
          currentSeverity={severityFilter}
        />
        <Button variant="secondary" onClick={() => setSidebarOpen(prev => !prev)} size="md">
          <img
            src={"icons/Hamburg.svg"}
            alt="Recently Accessed"
            style={{ width: "18px", height: "18px" }}
          />
        </Button>
      </div>

      <RecentlyAccessed
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export { ControlBar };
