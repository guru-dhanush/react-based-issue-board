import { FC, memo } from "react";
import { Issue } from "../../../types";
import { formatDate } from "../../../utils/dateUtils";

type IssueCardProps = {
  issue: Issue;
  className?: string;
  onClick?: (issue: Issue) => void;
};

export const IssueCard: FC<IssueCardProps> = memo(({ issue }) => {
  return (
    <>
      <div className="issue-card__header space">
        <div
          className="issue-card__priority-icon"
          style={{ backgroundColor: `${issue.color}` }}
        >
          <img
            src={"/icons/flag.svg"}
            alt="priority"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
        <h3 className="issue-card__title">{issue.title}</h3>
      </div>

      <div className="issue-card__content space">
        <div className="issue-card__row">
          <img
            src={"/icons/stack.svg"}
            alt="priority"
            style={{ width: "20px", height: "20px" }}
          />
          <p className="issue-card__text">{issue.description}</p>
        </div>

        {issue.assignee && (
          <div className="issue-card__row">
            <img
              src={"/icons/user.svg"}
              alt="priority"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="issue-card__text">{issue.assignee}</span>
          </div>
        )}

        <div className="issue-card__footer">
          <img
            src={"/icons/date.svg"}
            alt="priority"
            style={{ width: "18px", height: "15px" }}
          />
          <time className="issue-card__time-badge" dateTime={issue.createdAt}>
            {formatDate(issue.createdAt)}
          </time>
        </div>

        {issue.tags.length > 0 && (
          <div className="issue-card__tags">
            {issue.tags.map((tag) => (
              <span className="issue-card__tag" key={`${issue.id}-${tag}`}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="issue-card__score">Score: {issue.score ?? "00"}</div>
      </div>
    </>
  );
});
