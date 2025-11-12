import React, { useState } from "react";
import "./Filters.css";
import { Dropdown } from "../../../common/ui/Dropdown";
import { Select } from "../../../common/ui/Select";
import { Button } from "../../../common/ui/Button";
import { Issue } from "../../../../types";
import { severityOptions } from "../../../../constants/boardConfig";

interface FilterControlsProps {
  onFilterAssignee: (assignee: string | null) => void;
  onFilterSeverity: (severity: number | null) => void;
  currentAssignee: string | null;
  currentSeverity: number | null;
  issues:  Record<string, Issue>;
}

interface SelectOption {
  value: string;
  label: string;
}

export const FilterControls = React.memo(function FilterControls({
  onFilterAssignee,
  onFilterSeverity,
  currentAssignee,
  currentSeverity,
  issues,
}: FilterControlsProps) {
  const [localAssignee, setLocalAssignee] = useState<string | null>(
    currentAssignee
  );
  const [localSeverity, setLocalSeverity] = useState<number | null>(
    currentSeverity
  );

  const assigneeOptions = React.useMemo<SelectOption[]>(() => {
    const allAssignees = new Set<string>();

    Object.values(issues).forEach((issue: Issue) => {
      if (issue.assignee) {
        allAssignees.add(issue.assignee);
      }
    });

    return [
      { value: "", label: "All" },
      ...Array.from(allAssignees)
        .sort((a, b) => a.localeCompare(b))
        .map((assignee: string) => ({
          value: assignee,
          label: assignee,
        })),
    ];
  }, [issues]);

 

  const handleApply = () => {
    onFilterAssignee(localAssignee);
    onFilterSeverity(localSeverity);
  };

  const handleClear = () => {
    setLocalAssignee(null);
    setLocalSeverity(null);
    onFilterAssignee(null);
    onFilterSeverity(null);
  };

  const getFilterCount = () => {
    let count = 0;
    if (currentAssignee) count++;
    if (currentSeverity) count++;
    return count;
  };

  return (
    <div className="filters-container">
      <Dropdown>
        <Dropdown.Trigger>
          <div className="filter-trigger">
            <img
              src={"icons/filters.svg"}
              alt="Filter"
              style={{ width: "18px", height: "18px" }}
            />
            <span className="hidden-text">
              {getFilterCount() > 0
                ? `Filters (${getFilterCount()})`
                : "Filters"}
            </span>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content width="auto" align="right">
          <div className="filter-dropdown">
            <div className="filter-section">
              <Select
                label="Assignee"
                name="assignee"
                value={localAssignee ?? ""}
                onChange={(value) => setLocalAssignee(value || null)}
                options={assigneeOptions}
                placeholder="All Assignees"
                className="mb-3"
              />
            </div>

            <div className="filter-section">
              <Select
                label="Severity"
                name="severity"
                value={localSeverity?.toString() ?? ""}
                onChange={(value) =>
                  setLocalSeverity(value ? parseInt(value, 10) : null)
                }
                options={severityOptions}
                placeholder="All Severities"
                className="mb-4"
              />
            </div>

            <div className="filter-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="mr-2"
              >
                Clear
              </Button>
              <Button variant="primary" size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
});
