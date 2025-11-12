import React, { useCallback, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { getPriorityInfo } from "../../../../../utils/priorityCalculator";
import { formatDate, formatDateTime } from "../../../../../utils/dateUtils";
import { COLUMNS } from "../../../../../constants/boardConfig";
import { Button } from "../../../../../components/common/ui/Button";
import "./IssueCard.css";
import { Issue, IssueStatus } from "../../../../../types";
import { usePermissions } from "../../../../../hooks/usePermissions";

interface IssueCardProps {
  issue: Issue;
  draggable?: boolean;
  onMoveIssue?: (issueId: string, newStatus: IssueStatus) => void;
}

export const IssueCard = React.memo(function IssueCard({
  issue,
  draggable = false,
  onMoveIssue,
}: IssueCardProps) {
  const navigate = useNavigate();
  const { can } = usePermissions();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: issue.id,
      disabled: !draggable,
      data: { issue },
    });

  const currentStatusIndex = COLUMNS.indexOf(issue.status);
  const canMoveLeft = currentStatusIndex > 0;
  const canMoveRight = currentStatusIndex < COLUMNS.length - 1;

  const handleMoveLeft = useCallback(() => {
    if (canMoveLeft && onMoveIssue) {
      onMoveIssue(issue.id, COLUMNS[currentStatusIndex - 1]);
    }
  }, [canMoveLeft, onMoveIssue, issue.id, currentStatusIndex]);

  const handleMoveRight = useCallback(() => {
    if (canMoveRight && onMoveIssue) {
      onMoveIssue(issue.id, COLUMNS[currentStatusIndex + 1]);
    }
  }, [canMoveRight, onMoveIssue, issue.id, currentStatusIndex]);

  const handleMoveLeftClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleMoveLeft();
    },
    [handleMoveLeft]
  );

  const handleMoveRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleMoveRight();
    },
    [handleMoveRight]
  );

  const leftArrowIcon = useMemo(
    () => (
      <img
        src="/icons/leftArrow.svg"
        alt="left"
        style={{ height: "20px", width: "20px" }}
      />
    ),
    []
  );

  const rightArrowIcon = useMemo(
    () => (
      <img
        src="/icons/rightArrow.svg"
        alt="right"
        style={{ height: "20px", width: "20px" }}
      />
    ),
    []
  );

  const { score: priorityScore, color: priorityColor } = getPriorityInfo(issue);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const classes = classNames("issue-card", {
    "issue-card-dragging": isDragging,
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes}
      {...(draggable ? { ...attributes, ...listeners } : {})}
      onClick={() => navigate(`/issue/${issue.id}`)}
    >
      <div className="issue-card-header space">
        <div
          className="issue-card-priority-icon"
          style={{ backgroundColor: priorityColor }}
          title={`Priority Score: ${priorityScore}`}
        >
          <img
            src={"/icons/flag.svg"}
            alt="priority"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
        <h3 className="issue-card-title">{issue.title}</h3>

        <button className="issue-card-menu">
          <span>⋮</span>
        </button>
      </div>

      <div className="space">
        <div className="issue-card-row">
          <img
            src={"/icons/stack.svg"}
            alt="priority"
            style={{ width: "20px", height: "20px" }}
          />
          {issue.description && (
            <p className="issue-card-description">{issue.description}</p>
          )}
        </div>

        <div className="issue-card-row">
          <img
            src={"/icons/date.svg"}
            alt="priority"
            style={{ width: "18px", height: "15px" }}
          />
          <span className="issue-card-description">
            {formatDate(issue.createdAt)}
          </span>
        </div>

        <div className="issue-card-row">
          <img
            src={"/icons/user.svg"}
            alt="priority"
            style={{ width: "20px", height: "20px" }}
          />
          <span className="issue-card-description">{issue.assignee}</span>
        </div>

        <div className="issue-card-footer">
          <div className="issue-card-time-badge">
            {formatDateTime(issue.createdAt)}
          </div>
        </div>
        {issue.tags && issue.tags.length > 0 && (
          <div className="issue-card-text">
            {issue.tags.map((tag) => (
              <span key={tag} className="issue-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="issue-card-text">Score: {priorityScore}</div>
      </div>

      {can("move_issue") && (
        <div className="issue-card-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMoveLeftClick}
            disabled={!canMoveLeft}
            className="move-button"
            aria-label="Move left"
          >
            {leftArrowIcon}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMoveRightClick}
            disabled={!canMoveRight}
            className="move-button"
            aria-label="Move right"
          >
            {rightArrowIcon}
          </Button>
        </div>
      )}
    </div>
  );
});
