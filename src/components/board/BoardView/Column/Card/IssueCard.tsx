import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { getPriorityInfo } from "../../../../../utils/priorityCalculator";
import { formatDate, formatDateTime } from "../../../../../utils/dateUtils";
import "./IssueCard.css";
import { Issue } from "../../../../../types";

interface IssueCardProps {
  issue: Issue;
  draggable?: boolean;
}

export const IssueCard = React.memo(function IssueCard({
  issue,
  draggable = false,
}: IssueCardProps) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: issue.id,
      disabled: !draggable,
      data: { issue },
    });

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
    </div>
  );
});
