import { Issue } from "../types";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export const mockFetchIssues = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      import("../data/issues.json").then((module) => resolve(module.default));
    }, 500);
  });
};

export const mockFetchIssuesPaginated = async (
  params: PaginationParams = {}
): Promise<PaginatedResponse<Issue>> => {
  const { page = 1, pageSize = 20 } = params;

  return new Promise((resolve) => {
    setTimeout(async () => {
      const module = await import("../data/issues.json");
      const allIssues = module.default as Issue[];

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = allIssues.slice(startIndex, endIndex);

      resolve({
        data: paginatedData,
        total: allIssues.length,
        page,
        pageSize,
        hasMore: endIndex < allIssues.length,
      });
    }, 500);
  });
};

export const mockUpdateIssue = (issueId: string, updates: Partial<Issue>) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        resolve({ id: issueId, ...updates });
      } else {
        reject(new Error("Failed to update issue"));
      }
    }, 500);
  });
};
