import { useMemo } from "react";
import { Issue, IssueStatus } from "../../types";
import { useIssues } from "../../context/IssuesContext";
import { useFilters } from "../../context/FiltersContext";

export function useBoardFiltersOptimized() {
  const { state: issuesState } = useIssues();
  const { state: filtersState } = useFilters();

  return useMemo(() => {
    let allIssuesList = Object.values(issuesState.issues);

    if (filtersState.search) {
      const query = filtersState.search.toLowerCase();
      allIssuesList = allIssuesList.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query) ||
          issue.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filtersState.assignee) {
      allIssuesList = allIssuesList.filter(
        (issue) => issue.assignee === filtersState.assignee
      );
    }

    if (filtersState.severity !== null) {
      allIssuesList = allIssuesList.filter(
        (issue) => issue.severity === filtersState.severity
      );
    }

    const columnIssues: Record<IssueStatus, Issue[]> = {
      Backlog: [],
      "In Progress": [],
      Done: [],
    };

    allIssuesList.forEach((issue) => {
      if (columnIssues[issue.status]) {
        columnIssues[issue.status].push(issue);
      }
    });

    return { columnIssues, allIssues: allIssuesList };
  }, [issuesState.issues, filtersState]);
}
