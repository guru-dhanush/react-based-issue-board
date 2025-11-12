import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/common/layout/Layout";
import { LoadingSpinner } from "./components/common/ui/Loader";
import "./App.css";

const BoardPage = lazy(() => import("./pages/BoardPage"));
const IssueDetailPage = lazy(() => import("./pages/IssueDetailPage"));

export const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <div className="fallback_loader">
              <LoadingSpinner size="md" message="Loading page..." />
            </div>
          }
        >
          <Routes>
            <Route path="/board" element={<BoardPage />} />
            <Route path="/issue/:id" element={<IssueDetailPage />} />
            <Route path="*" element={<Navigate to="/board" />} />
          </Routes>
        </Suspense>
      </Layout>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};
