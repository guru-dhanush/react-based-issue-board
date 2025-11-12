import { Issue } from "../types";
import { calculatePriority } from "./priorityCalculator";
import { getTimestamp } from "./dateUtils";

export function Sort(issues: Issue[]): Issue[] {
  const indexedIssues = issues.map((issue, index) => ({
    issue,
    index,
    score: calculatePriority(issue),
    timestamp: getTimestamp(issue.createdAt),
  }));

  indexedIssues.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }

    if (a.timestamp !== b.timestamp) {
      return b.timestamp - a.timestamp;
    }

    return a.index - b.index;
  });

  return indexedIssues.map((item) => item.issue);
}
