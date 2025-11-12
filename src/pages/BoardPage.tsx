import { BoardView, ControlBar } from "../components/board";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { SyncIndicator } from "../components/SyncIndicator";

const BoardPage = () => {
  return (
    <ErrorBoundary>
      <div className="page-container">
        <div className="board-container">
          <SyncIndicator />
          <ControlBar />
          <BoardView />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BoardPage;
