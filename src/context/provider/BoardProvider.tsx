import { ReactNode } from "react";
import { IssuesProvider } from "../IssuesContext";
import { FiltersProvider } from "../FiltersContext";
import { PaginationProvider } from "../PaginationContext";
import { UIProvider } from "../UIContext";

interface BoardProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardProviderProps) {
  return (
    <UIProvider>
      <IssuesProvider>
        <FiltersProvider>
          <PaginationProvider>{children}</PaginationProvider>
        </FiltersProvider>
      </IssuesProvider>
    </UIProvider>
  );
}
