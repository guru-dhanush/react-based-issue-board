import React, { ReactNode } from "react";
import { Header } from "./Header/Header";
import { ErrorBoundary } from "../ErrorBoundary";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`${className || ""}`}>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};
