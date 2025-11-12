import { useMemo } from "react";
import { useKanbanStore } from "../../store/kanban.store";

//for filters
function useAssigneeOptions() {
  const issues = useKanbanStore((s) => s.issues);
  const order = useKanbanStore((s) => s.order);

  return useMemo(() => {
    const allAssignees = new Set<string>();

    order.forEach((id) => {
      if (issues[id].assignee) {
        allAssignees.add(issues[id].assignee);
      }
    });

    return [
      { value: "", label: "All" },
      ...Array.from(allAssignees)
        .sort((a, b) => a.localeCompare(b))
        .map((a) => ({ value: a, label: a })),
    ];
  }, [issues, order]);
}

export default useAssigneeOptions;
