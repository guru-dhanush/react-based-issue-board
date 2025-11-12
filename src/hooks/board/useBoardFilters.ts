import { useCallback, useMemo } from "react";
import { Issue, IssueStatus } from "../../types";
import { useKanbanStore } from "../../store/kanban.store";
import { IssuesFilterSlice } from "../../store/kanban.types";

//handle search by title or tags
//filter by assignee or severity
export function useBoardFilters() {
  const issues = useKanbanStore((state) => state.issues);
  const order = useKanbanStore((state) => state.order);
  const filters = useKanbanStore((state) => state.filters);
  const searchQuery = useKanbanStore((state) => state.searchQuery);
  const updateFilter = useKanbanStore((state) => state.updateFilter);
  const resetFilter = useKanbanStore((state) => state.resetFilter);
  const setSearch = useKanbanStore((state) => state.setSearch);

  const IssuesPerColumn = useMemo(() => {
    let filteredOrder = [...order];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredOrder = filteredOrder.filter(
        (id) =>
          issues[id].title.toLowerCase().includes(query) ||
          issues[id].tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.assignee) {
      filteredOrder = filteredOrder.filter(
        (id) => issues[id].assignee === filters.assignee
      );
    }

    if (filters.severity !== null) {
      filteredOrder = filteredOrder.filter(
        (id) => issues[id].severity === filters.severity
      );
    }

    const columnIssues: Record<IssueStatus, Issue[]> = {
      Backlog: [],
      "In Progress": [],
      Done: [],
    };

    filteredOrder.forEach((id) => {
      const issue = issues[id];
      if (issue) columnIssues[issue.status].push(issue);
    });

    return columnIssues;
  }, [issues, filters, order, searchQuery]);

  const handleFilterApply = (filters: IssuesFilterSlice["filters"]) => {
    updateFilter(filters);
  };

  const handleFilterReset = () => {
    resetFilter();
  };
  const handleSearch = useCallback(
    (searchQuery: IssuesFilterSlice["searchQuery"]) => {
      setSearch(searchQuery);
    },
    [setSearch]
  );

  return {
    IssuesPerColumn,
    filters,
    searchQuery,
    handleFilterApply,
    handleFilterReset,
    handleSearch,
  };
}
