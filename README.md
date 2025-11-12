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

- Custom polling system that syncs data in the background with configurable intervals.
- Pause and resume functionality for the polling system.
- Automatic conflict resolution and data merging.

### 3. Advanced State Management

- Split monolithic context into four specialized contexts (Issues, Filters, Pagination, UI) for optimal performance.
- Comprehensive undo system with transition history and rollback capability.
- Toast notifications for user feedback with automatic timeout handling.

### 4. Role-Based Access Control

- Different permission levels for admin and contributor users.
- Conditional UI rendering based on user permissions.
- Permission-based hook system integrated with context architecture.

### 5. Performance Optimization

- Strategic use of React.memo to prevent unnecessary component re-renders.
- Memoized callbacks and expensive computations using useCallback and useMemo.
- Context splitting to minimize re-render scope and improve performance.

### 6. Pagination and Data Loading

- Infinite scroll implementation with "load more" functionality.
- Efficient handling of large datasets with pagination support.
- Loading states and error handling for better user experience.

---

## Tech Stack

### Frontend

- **React.js**: Main framework with functional components and hooks
- **TypeScript**: For type safety and better development experience
- **React Context API**: For state management with specialized contexts
- **React Router**: For navigation between pages

### Additional Libraries

- **@dnd-kit/core**: For drag and drop functionality
- **react-toastify**: For user notifications and feedback
- **CSS Custom Properties**: For theming and consistent styling

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-based-issue-board.git
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

---

## Challenges I Faced During Development

### 1. Performance Bottlenecks

- **Challenge**: The original monolithic BoardContext caused widespread re-renders whenever any state changed, leading to poor performance.
- **Solution**: Split the context into four specialized contexts (Issues, Filters, Pagination, UI) and implemented strategic memoization with React.memo and useCallback.

### 2. Complex State Management

- **Challenge**: Managing optimistic updates while maintaining rollback functionality for drag-and-drop operations was complex.
- **Solution**: Implemented a transition history system that tracks all changes and allows proper undo functionality with toast notifications.

### 3. Drag and Drop Implementation

- **Challenge**: Integrating @dnd-kit with the context architecture while maintaining type safety and performance.
- **Solution**: Created a specialized useBoardDnd hook that manages all drag-and-drop logic and integrates cleanly with the IssuesContext.

### 4. Type Safety Across Contexts

- **Challenge**: With multiple contexts each having their own action types, maintaining type safety became complex.
- **Solution** : Used proper TypeScript inference to maintain type safety across the application.

### 5. Testing Complex Logic

- **Challenge**: Testing the priority calculation algorithm and ensuring sorting stability across different scenarios.
- **Solution**: Implemented unit test for sorting algorithm in `sortingUtils.test.ts`. Due to time constraints, only wrote one test covering the core sorting functionality.
