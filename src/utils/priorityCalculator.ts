import { Issue } from "../types";
import { calculateDaysSince } from "./dateUtils";

export interface PriorityInfo {
  score: number;
  label: string;
  color: string;
}

export function calculatePriority(issue: Issue): number {
  const daysSinceCreated = calculateDaysSince(issue.createdAt);
  const severityScore = issue.severity * 10;
  const ageScore = daysSinceCreated * -1;
  const rankScore = issue.rank || 0;

  return severityScore + ageScore + rankScore;
}

export function getPriorityLabel(score: number): string {
  if (score >= 40) return "Critical";
  if (score >= 30) return "High";
  if (score >= 20) return "Medium";
  if (score >= 10) return "Low";
  return "Minimal";
}

export function getPriorityColor(score: number): string {
  if (score >= 40) return "#dc2626";
  if (score >= 30) return "#ea580c";
  if (score >= 20) return "#ca8a04";
  if (score >= 10) return "#2186ab";
  return "#6b7280";
}

export function getPriorityInfo(issue: Issue): PriorityInfo {
  const score = calculatePriority(issue);
  return {
    score,
    label: getPriorityLabel(score),
    color: getPriorityColor(score),
  };
}
