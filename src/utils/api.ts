import { MOCK_DB_KEY } from "../constants/settingsConfig";
import { Issue } from "../types";
import { storage } from "./storageUtils";

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
      let allIssues;
      const storedData = storage.get(MOCK_DB_KEY);
      if (storedData && Array.isArray(storedData) && storedData.length > 0) {
        allIssues = storedData as Issue[];
      } else {
        const module = await import("../data/issues.json");
        allIssues = module.default as Issue[];
        storage.set(MOCK_DB_KEY, allIssues);
      }

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
      if (Math.random() < 0.9) {
        if (storage.get(MOCK_DB_KEY)) {
          const updatedIssues = storage.get(MOCK_DB_KEY) as Issue[];
          const updatedIssue = updatedIssues.map((issue) =>
            issue.id === issueId ? { ...issue, ...updates } : issue
          );
          storage.set(MOCK_DB_KEY, updatedIssue);
        }
        resolve({ id: issueId, ...updates });
      } else {
        reject(
          new Error(
            "We couldn't perform this action due to temporary server issue. Try again a moment"
          )
        );
      }
    }, 500);
  });
};

/**
 * MOCK BACKEND SERVICE (using localStorage as database)
 * -----------------------------------------------------
 * This file simulates a backend API using:
 *  - setTimeout → to mimic network delay
 *  - localStorage → to mimic database persistence
 *  - random failures → to mimic real API unreliability
 *
 * This setup helps test:
 *  - optimistic UI updates
 *  - undo flows
 *  - pagination with network delays
 *  - server-side update failures
 *  -
 */
