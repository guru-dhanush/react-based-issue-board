import { Link } from "react-router-dom";
import { Button } from "../common/ui/Button";

export const IssueDetailHeader = () => {
  return (
    <div className="issue-detail-header">
      <Link to="/board" className="back-link">
        <Button variant="secondary">Back to Board</Button>
      </Link>
    </div>
  );
};
