import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { Issue, IssueStatus } from "../../../../types";
import { IssueCard } from "./Card/IssueCard";
import { usePrioritySort } from "../../../../hooks/board/usePrioritySort";
import { useVirtualScroll } from "../../../../hooks/useVirtualScroll";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import "./BoardColumn.css";
import React, { useCallback } from "react";
import { useLoadMoreState } from "../../../../context/PaginationContext";

interface BoardColumnProps {
  columnId: IssueStatus;
  title: string;
  issues: Issue[];
  draggable?: boolean;
  onLoadMore?: () => void;
}

export const BoardColumn = React.memo(function BoardColumn({
  columnId,
  title,
  issues,
  draggable = false,
  onLoadMore,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { columnId },
  });
  const [isLoadingMore, hasMore] = useLoadMoreState();
  const sortedIssues = usePrioritySort(issues);

  const classes = classNames("board-column", {
    "board-column-over": isOver,
  });

  const { virtualItems, offsetY, containerRef } = useVirtualScroll(
    sortedIssues,
    {
      itemHeight: 180,
      containerHeight: 600,
      overscan: 5,
    }
  );

  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    hasMore: hasMore || false,
    isLoading: isLoadingMore || false,
    threshold: 100,
  });

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (node && containerRef) {
        (containerRef as React.RefObject<HTMLDivElement | null>).current = node;
      }
    },
    [setNodeRef, containerRef]
  );

  return (
    <div className={classes}>
      <div className="board-column-header">
        <div className="display-flex">
          <h2 className={`board-column-title title-${title}`}>{title}</h2>
          <span className="board-column-count">{issues.length}</span>
        </div>
      </div>

      <div ref={mergedRef} className="board-column-content">
        {sortedIssues.length === 0 ? (
          <div className="board-column-empty">No issues in {title}</div>
        ) : (
          <div style={{ position: "relative" }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {virtualItems.map((issue) => (
                <IssueCard key={issue.id} issue={issue} draggable={draggable} />
              ))}
            </div>
            {hasMore && (
              <div ref={sentinelRef} className="load-more-sentinel">
                {isLoadingMore && (
                  <div className="loading-indicator">Loading more...</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
