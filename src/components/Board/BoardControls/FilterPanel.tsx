import { FC, useState } from "react";
import { Dropdown } from "../../common/ui/Dropdown";
import { IssuesFilterSlice } from "../../../store/kanban.types";
import { Select } from "../../common/ui/Select";
import { severityOptions } from "../../../constants/boardConfig";
import { Button } from "../../common/ui/Button";

interface FilterControlsProps {
  assigneeOptions: SelectOption[];
  onApply: (filters: IssuesFilterSlice["filters"]) => void;
  onReset: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}
export const FilterPanel: FC<FilterControlsProps> = ({
  assigneeOptions,
  onApply,
  onReset,
}) => {
  const [assignee, setAssignee] = useState<string | null>(null);
  const [severity, setSeverity] = useState<number | null>(null);

  const handleApply = () => {
    onApply({ severity, assignee });
  };

  const handleClear = () => {
    setAssignee(null);
    setSeverity(null);
    onReset();
  };

  return (
    <div className="filter-panel">
      <Dropdown>
        <Dropdown.Trigger>
          <div className="filter-panel__trigger">
            <img
              src="icons/filters.svg"
              alt="Filter"
              style={{ width: "18px", height: "18px" }}
            />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content width="auto" align="right">
          <div className="filter-panel__dropdown">
            <div className="filter-panel__section">
              <Select
                label="Assignee"
                name="assignee"
                value={assignee ?? ""}
                onChange={(value) => setAssignee(value || null)}
                options={assigneeOptions}
                placeholder="All Assignees"
              />
            </div>

            <div className="filter-panel__section">
              <Select
                label="Severity"
                name="severity"
                value={severity?.toString() ?? ""}
                onChange={(value) =>
                  setSeverity(value ? parseInt(value, 10) : null)
                }
                options={severityOptions}
                placeholder="All Severities"
              />
            </div>

            <div className="filter-panel__actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="filter-panel__action-btn"
              >
                Clear
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
                className="filter-panel__action-btn"
              >
                Apply
              </Button>
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};
