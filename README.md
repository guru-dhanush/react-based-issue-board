# Issue Board

## Overview

This application is a React based issue board system. It provides a Kanban style board interface similar to Jira or GitHub Projects, with features like drag and drop functionality, real-time synchronization, role-based permissions, and advanced performance optimizations. The application demonstrates modern React patterns including context splitting, memoization strategies, and clean state management.

---

## Features

### 1. Kanban Board Interface

- Three column layout (Backlog, In Progress, Done) with smooth drag-and-drop functionality between columns.
- Dynamic priority scoring algorithm based on issue severity, age, and ranking.
- Optimistic updates provide instant UI feedback during operations.

### 2. Real-time Data Synchronization

To simulate real-time collaborative behaviour (similar to Jira):

#### **🔹 a. Simulated Live Updates Using `localStorage` Events**

I replicated a multi-user real-time environment by using the `storage` event.
Whenever one tab updates the mock DB stored in `localStorage`, all _other_ tabs automatically receive the update.

```ts
useEffect(() => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === MOCK_DB_KEY) {
      fetchData(); // Refresh data when changes occur in another tab
    }
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);
```

**Why this works:**

- The `storage` event fires **only in other tabs**, not the one making the update.
- This perfectly simulates real backend push updates / WebSocket-like behaviour.
- All open tabs stay synchronized automatically.

This allowed me to mimic **live multi-client collaboration** without a real backend.

---

#### **🔹 Case Study Findings: Real-time Update Options**

Considering polling options for live updates:

**Current Implementation (Event-based):**

- Cross-tab sync via localStorage events

**Recommendation for Production:**

- **WebSocket is the best option** for real-time live updates
- Handles concurrent users and rapid updates reliably
- True real-time synchronization across devices

Current event based approach works for case study , but WebSocket would be ideal for production scenarios.

---

### 3. State Management

- Main states are Issues, Filters.
- Comprehensive undo system with transition history and rollback capability.
- Toast notifications for user feedback with automatic timeout handling.

### 4. Role-Based Access Control

- Different permission levels for admin and contributor users.
- Conditional UI rendering based on user permissions.
- Permission-based hook system integrated with context architecture.

### 5. Performance Optimization

- Strategic use of React.memo to prevent unnecessary component re-renders.
- Memoized callbacks and expensive computations using useCallback and useMemo.

---

## Tech Stack

### Frontend

- **React.js**: Main framework with functional components and hooks
- **TypeScript**: For type safety and better development experience
- **Zustand**: For state management 
- **React Router**: For navigation between pages

### Additional Libraries

- **@dnd-kit/core**: For drag and drop functionality
- **react-toastify**: For user notifications and feedback
- **CSS Custom Properties**: For theming and consistent styling

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/guru-dhanush/react-based-issue-board.git
   cd react-based-issue-board
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Commands

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite

---

## Future Scope

1. **Dark Mode Implementation**:

   - Add theme system with CSS custom properties for dark/light mode toggle.

2. **Real-time Collaboration**:

   - Implement WebSocket integration for multi-user real-time updates and collaboration.

3. **Advanced Filtering System**:

   - Expand filtering options with saved filter presets and complex query combinations.

4. **Comprehensive Testing**:

   - Add integration tests, end-to-end testing, and increase unit test coverage.

5. **Accessibility Improvements**:

   - Enhanced keyboard navigation, screen reader support, and WCAG compliance.

6. **Analytics Dashboard**:

   - Issue metrics, reporting features, and performance tracking capabilities.

7. **Virtual scroll and Infinte scroll for list of issue**:
   - Implement virtualized rendering and infinite scrolling for all column-level issues in the Kanban board to improve performance with large datasets..

---

## Challenges I Faced During Development

### 1. Performance Bottlenecks

- **Challenge**:A major challenge encountered was unavoidable re-rendering of all draggable/droppable components when using dnd-kit hooks (useDraggable / useDroppable) during drag interactions, even if component props remained unchange.
- **Solution**

I optimized the Kanban board by:

- Moving all DnD logic into a custom `useBoardDnD` hook
- Memoizing `KanbanBoard` and `KanbanColumn` to prevent unnecessary re-renders
- Using `useCallback` for stable handlers
- Keeping `Draggable` and `Droppable` lightweight so only the dragged item updates
- Applying drag transforms inline (not in React state) to avoid re-rendering during movement

This reduced re-renders and significantly improved drag performance.

