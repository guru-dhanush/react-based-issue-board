import { Issue } from "../types";
import { calculatePriority, getPriorityColor } from "./priorityCalculator";
import { getTimestamp } from "./dateUtils";

//sort issue by a priority score
export function Sort(issues: Issue[]): Issue[] {
  const indexedIssues = issues.map((issue, index) => {
    const score = calculatePriority(issue);
    return {
      issue,
      index,
      score,
      color: getPriorityColor(score),
      timestamp: getTimestamp(issue.createdAt),
    };
  });

  indexedIssues.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }

    if (a.timestamp !== b.timestamp) {
      return b.timestamp - a.timestamp;
    }

    return a.index - b.index;
  });
  // console.log(indexedIssues);
  return indexedIssues.map((item) => {
    const { issue, score, color } = item;
    return { ...issue, score, color };
  });
}
