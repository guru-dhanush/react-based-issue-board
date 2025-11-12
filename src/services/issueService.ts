import { Issue, IssueStatus } from "../types";
import { mockUpdateIssue, mockFetchIssuesPaginated } from "../utils/api";

export interface PaginatedIssuesResponse {
  data: Issue[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export async function fetchIssuesPaginated(
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedIssuesResponse> {
  try {
    const response = await mockFetchIssuesPaginated({ page, pageSize });

    return {
      data: response.data as Issue[],
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
      hasMore: response.hasMore,
    };
  } catch (error) {
    console.error("Failed to fetch paginated issues:", error);
    throw new Error("Failed to load issues");
  }
}

export async function updateIssueStatus(
  issueId: string,
  status: IssueStatus
): Promise<Issue> {
  try {
    const updated = await mockUpdateIssue(issueId, { status });
    return updated as Issue;
  } catch (error) {
    console.error("Failed to update issue status:", error);
    throw error;
  }
}

export async function moveIssue(
  issueId: string,
  toStatus: IssueStatus
): Promise<Issue> {
  return updateIssueStatus(issueId, toStatus);
}

export async function updateIssue(
  issueId: string,
  updates: Partial<Issue>
): Promise<Issue> {
  try {
    const updated = await mockUpdateIssue(issueId, updates);
    return updated as Issue;
  } catch (error) {
    console.error("Failed to update issue:", error);
    throw error;
  }
}

export async function resolveIssue(issueId: string): Promise<Issue> {
  return updateIssueStatus(issueId, "Done");
}

export async function syncExistingIssues(issueIds: string[]): Promise<Issue[]> {
  try {
    const response = await mockFetchIssuesPaginated({
      page: 1,
      pageSize: issueIds.length,
    });
    const allIssues = response.data as Issue[];
    return allIssues.filter((issue) => issueIds.includes(issue.id));
  } catch (error) {
    console.error("Failed to sync existing issues:", error);
    throw new Error("Failed to sync issues");
  }
}
