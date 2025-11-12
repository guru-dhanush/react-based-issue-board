import { Link } from "react-router-dom";
import { useRecentlyAccessed } from "../../hooks/recentlyAccessed/useRecentlyAccessed";
import { Issue } from "../../types";
import { Sidebar } from "../common/ui/Sidebar";
import "./RecentlyAccessed.css";
import React, { useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { getPriorityInfo } from "../../utils/priorityCalculator";
import { Button } from "../common/ui/Button";

export const RecentlyAccessed = React.memo(function RecentlyAccessed() {
  const [open, setOpen] = useState(false);
  const { recent, clearRecent } = useRecentlyAccessed();

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ display: "inline-block" }}>
        <Button
          variant="secondary"
          onClick={() => setOpen((prev) => !prev)}
          size="md"
        >
          <img src={"icons/Hamburg.svg"} alt="Sidebar" width={18} height={18} />
        </Button>
      </div>
      <Sidebar
        isOpen={open}
        onClose={handleClose}
        title="Recently Accessed"
        footer={
          recent.length > 0 && (
            <button
              className="recently-accessed__clear-btn"
              onClick={clearRecent}
            >
              Clear History
            </button>
          )
        }
      >
        {recent.length === 0 ? (
          <div className="recently-accessed__empty">
            <p>No recently accessed issues</p>
            <p className="recently-accessed__empty-hint">
              Click on any issue to see it here
            </p>
          </div>
        ) : (
          <div className="recent-accessed-list">
            {recent.map((issue: Issue, index: number) => (
              <Link
                key={issue.id}
                to={`/issue/${issue.id}`}
                className="recently-accessed__item"
                onClick={handleClose}
              >
                <div className="recently-accessed__item-header">
                  <span className="recently-accessed__item-number">
                    {index + 1}
                  </span>
                  <span className="recently-accessed__item-id">
                    #{issue.id}
                  </span>
                  <span className="recently-accessed__item-priority">
                    Score: {getPriorityInfo(issue).score}
                  </span>
                </div>

                <h4 className="recently-accessed__item-title">{issue.title}</h4>

                <div className="recently-accessed__item-meta">
                  <span className="recently-accessed__item-status">
                    {issue.status}
                  </span>
                  <span className="recently-accessed__item-date">
                    {formatDate(issue.createdAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Sidebar>
    </>
  );
});
