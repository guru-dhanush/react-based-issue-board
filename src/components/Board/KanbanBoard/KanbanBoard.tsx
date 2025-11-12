import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { COLUMNS } from "../../../constants/boardConfig";
import { IssuesByStatus, Issue } from "../../../types";
import { KanbanColumn } from "./KanbanColumn";
import usePermissions from "../../../hooks/usePermissions";

interface KanbanBoardProps {
  issuesPerColumn: IssuesByStatus;
}

export const KanbanBoard: FC<KanbanBoardProps> = memo(
  ({ issuesPerColumn }) => {
    const navigate = useNavigate();
    const { isAdmin } = usePermissions();

    const handleCardClick = useCallback(
      (issueId: Issue["id"]) => {
        navigate(`/issue/${issueId}`);
      },
      [navigate]
    );

    return (
      <div className="kanban-board">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            issues={issuesPerColumn[status]}
            onCardClick={handleCardClick}
            totalIssues={issuesPerColumn[status].length}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    );
  }
);
