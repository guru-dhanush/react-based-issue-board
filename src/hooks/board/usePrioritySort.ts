import { useMemo } from "react";
import { Issue } from "../../types";
import { Sort } from "../../utils/sortingUtils";

export function usePrioritySort(issues: Issue[]): Issue[] {
  return useMemo(() => {
    return Sort(issues);
  }, [issues]);
}
