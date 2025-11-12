import { Link } from "react-router-dom";
import { Button } from "../common/ui/Button";

interface IssueNotFoundProps {
  issueId?: string;
  error?: string;
}

export const IssueNotFound = ({ issueId, error }: IssueNotFoundProps) => {
  return (
    <div className="page-container">
      <div className="issue-not-found">
        <h2>Issue Not Found</h2>
        <p>
          {error ||
            (issueId
              ? `The issue with ID "${issueId}" could not be found.`
              : "No issue ID was provided.")}
        </p>
        <Link to="/board">
          <Button variant="primary">Back to Board</Button>
        </Link>
      </div>
    </div>
  );
};
