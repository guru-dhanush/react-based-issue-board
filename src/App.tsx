import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { SettingsProvider } from "./context/SettingsContext";
import { Layout } from "./components/common/layout/Layout";
import { LoadingSpinner } from "./components/common/ui/Loader";
import "./App.css";
import { BoardProvider } from "./context/provider/BoardProvider";

const BoardPage = lazy(() => import("./pages/BoardPage"));
const IssueDetailPage = lazy(() => import("./pages/IssueDetailPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

export const App = () => {
  return (
    <UserProvider>
      <SettingsProvider>
        <BoardProvider>
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
                  <Route path="/settings" element={<SettingsPage />} />
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
        </BoardProvider>
      </SettingsProvider>
    </UserProvider>
  );
};
