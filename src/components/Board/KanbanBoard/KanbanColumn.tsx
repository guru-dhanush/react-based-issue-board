import { FC, memo } from "react";
import { Issue, IssueStatus } from "../../../types";
import { IssueCard } from "./IssueCard";
import { Draggable } from "../../DnD/Draggable";
import { Droppable } from "../../DnD/Droppable";
import { usePrioritySort } from "../../../hooks/board/usePrioritySort";

interface KanbanColumnProps {
  status: IssueStatus;
  issues: Issue[];
  onCardClick: (issueId: Issue["id"]) => void;
  totalIssues: number;
  isAdmin: boolean;
}

export const KanbanColumn: FC<KanbanColumnProps> = memo(
  ({ status, issues, totalIssues, isAdmin, onCardClick }) => {
    const sortedIssues = usePrioritySort(issues);
    return (
      <div className="board-column">
        <ColumnHeader status={status} count={totalIssues} />

        <Droppable className="board-column__content" id={status}>
          {sortedIssues.map((issue) => (
            <Draggable
              key={issue.id}
              id={issue.id}
              draggable={isAdmin}
              data={issue}
              onClick={() => onCardClick(issue.id)}
              className="issue-card"
            >
              <IssueCard issue={issue} />
            </Draggable>
          ))}
        </Droppable>
      </div>
    );
  }
);

interface ColumnHeaderProps {
  status: IssueStatus;
  count: number;
}

const ColumnHeader: FC<ColumnHeaderProps> = ({ status, count }) => (
  <div className="board-column__header">
    <div className="board-column__header-content">
      <h2 className={`board-column__title board-column__title--${status}`}>
        {status}
      </h2>
      <span className="board-column__count">{count}</span>
    </div>
  </div>
);
