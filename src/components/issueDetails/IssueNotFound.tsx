import { Link } from "react-router-dom";
import { Button } from "../common/ui/Button";

interface IssueNotFoundProps {
  issueId?: string;
}

export const IssueNotFound = ({ issueId }: IssueNotFoundProps) => {
  return (
    <div className="page-container">
      <div className="error-page">
        <h2>Issue Not Found</h2>
        <p>Issue #{issueId} could not be found.</p>
        <Link to="/board">
          <Button variant="primary">Back to Board</Button>
        </Link>
      </div>
    </div>
  );
};
