import React, { ReactNode } from "react";
import { ErrorBoundary } from "../ErrorBoundry/ErrorBoundary";
import { Header } from "./Header/Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`${className || "app-container"}`}>
      <ErrorBoundary fallback="Failed Load header">
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="page-container">{children} </div>
      </ErrorBoundary>
    </div>
  );
};
