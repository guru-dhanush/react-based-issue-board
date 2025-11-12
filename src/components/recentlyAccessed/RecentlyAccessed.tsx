import { Link } from "react-router-dom";
import { useRecentlyAccessed } from "../../hooks/recentlyAccessed/useRecentlyAccessed";
import { formatDate } from "../../utils/dateUtils";
import { getPriorityInfo } from "../../utils/priorityCalculator";
import { Issue } from "../../types";
import { Sidebar } from "../common/ui/Sidebar";
import "./RecentlyAccessed.css";
import React from "react";

interface RecentlyAccessedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecentlyAccessed = React.memo(function RecentlyAccessed({
  isOpen,
  onClose,
}: RecentlyAccessedSidebarProps) {
  const { recent, clearRecent } = useRecentlyAccessed();

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Recently Accessed"
      footer={
        recent.length > 0 && (
          <button className="recent-accessed-clear-btn" onClick={clearRecent}>
            Clear History
          </button>
        )
      }
    >
      {recent.length === 0 ? (
        <div className="recent-accessed-empty">
          <p>No recently accessed issues</p>
          <p className="recent-accessed-empty-hint">
            Click on any issue to see it here
          </p>
        </div>
      ) : (
        <div className="recent-accessed-list">
          {recent.map((issue: Issue, index: number) => (
            <Link
              key={issue.id}
              to={`/issue/${issue.id}`}
              className="recent-accessed-item"
              onClick={onClose}
            >
              <div className="recent-accessed-item-header">
                <span className="recent-accessed-item-number">{index + 1}</span>
                <span className="recent-accessed-item-id">#{issue.id}</span>
                <span className="recent-accessed-item-priority">
                  Score: {getPriorityInfo(issue).score}
                </span>
              </div>
              <h4 className="recent-accessed-item-title">{issue.title}</h4>
              <div className="recent-accessed-item-meta">
                <span className="recent-accessed-item-status">
                  {issue.status}
                </span>
                <span className="recent-accessed-item-date">
                  {formatDate(issue.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Sidebar>
  );
});
