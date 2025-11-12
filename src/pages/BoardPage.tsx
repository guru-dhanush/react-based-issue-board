import { ErrorBoundary } from "../components/common/ErrorBoundry/ErrorBoundary";
import { BoardContainer } from "../components/Board/KanbanBoard/BoardContainer";

const BoardPage = () => {
  return (
    <ErrorBoundary>
      <BoardContainer />
    </ErrorBoundary>
  );
};

export default BoardPage;
