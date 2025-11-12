import { Sort } from "./sortingUtils";
import { Issue } from "../types";

describe("Sorting Algorithm", () => {
  const createIssue = (overrides: Partial<Issue>): Issue => ({
    id: "1",
    title: "Test",
    status: "Backlog",
    priority: "medium",
    severity: 3,
    createdAt: new Date().toISOString(),
    assignee: "Alice",
    tags: [],
    rank: 0,
    ...overrides,
  });

  it("should sort by priority score (highest first)", () => {
    const issues = [
      createIssue({ id: "1", severity: 1 }),
      createIssue({ id: "2", severity: 5 }),
      createIssue({ id: "3", severity: 3 }),
    ];

    const sorted = Sort(issues);

    expect(sorted[0].id).toBe("2");
    expect(sorted[1].id).toBe("3");
    expect(sorted[2].id).toBe("1");
  });

  it("should use timestamp as tiebreaker when scores are equal", () => {
    const issues = [
      createIssue({ id: "old", severity: 3, createdAt: "2024-01-01" }),
      createIssue({ id: "new", severity: 3, createdAt: "2024-01-15" }),
    ];

    const sorted = Sort(issues);

    expect(sorted[0].id).toBe("new");
    expect(sorted[1].id).toBe("old");
  });

  it("should maintain stable sort for identical issues", () => {
    const sameDate = "2024-01-01";
    const issues = [
      createIssue({ id: "A", severity: 3, createdAt: sameDate }),
      createIssue({ id: "B", severity: 3, createdAt: sameDate }),
      createIssue({ id: "C", severity: 3, createdAt: sameDate }),
    ];

    const sorted = Sort(issues);

    expect(sorted[0].id).toBe("A");
    expect(sorted[1].id).toBe("B");
    expect(sorted[2].id).toBe("C");
  });

  it("should handle empty array", () => {
    expect(Sort([])).toEqual([]);
  });
});
