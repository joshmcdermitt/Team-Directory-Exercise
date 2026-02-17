# Team Directory Exercise

A modern React application demonstrating scalable component architecture, loading states, and professional development practices.

## 🚀 Features

- **Team Directory** - Browse and filter team members by role, skills, and activity status
- **Advanced Filtering** - Search by name/skills, filter by team, sort by name or level
- **Interactive Stats** - Real-time team statistics with average levels and member counts
- **Debug Controls** - Toggle skeleton loading, simulate errors, and reset state
- **Responsive Design** - Mobile-friendly grid layout with modern CSS

## 🏗️ Architecture

### Component-Based Design
- **PersonCard** - Individual member cards with built-in loading skeletons
- **TeamSection** - Team groupings with empty states
- **PeopleGrid** - Scalable grid with integrated loading states
- **LoadingSkeleton** - Dedicated skeleton components matching exact dimensions

### Modern Tech Stack
- **React 18** - Latest React with hooks
- **TypeScript** - Full type safety
- **Emotion** - CSS-in-JS with styled components
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management and caching
- **Vite** - Fast development and building

## 🎯 Key Features

### Loading States
- **Automatic Skeletons** - Shows during API calls (200ms delay)
- **Manual Toggle** - Debug button to force skeleton display
- **No Layout Jumps** - Skeletons match exact card dimensions
- **Smooth Transitions** - Seamless loading to content transitions

### Filtering & Sorting
- **Team Filter** - Filter by Platform, Product, Design, Sales
- **Search** - Real-time search across names and skills
- **Sort Options** - Name (A-Z) or Level (high to low)
- **Active Status** - Toggle inactive member visibility

### Statistics Dashboard
- **Team Overview** - Total members, active count, manager count
- **Average Levels** - Rounded averages for better readability
- **Responsive Stats** - Grid layout for all team metrics

## 🛠️ Development

### Getting Started
```bash
# Clone the repository
git clone https://github.com/your-username/team-directory-exercise.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── PersonCard.tsx     # Individual member card
│   │   ├── TeamSection.tsx    # Team grouping
│   │   └── PeopleGrid.tsx      # Main grid component
│   ├── EmptyState.tsx          # Empty state displays
│   └── LoadingSkeleton.tsx    # Legacy skeleton components
├── constants/
│   ├── colors.ts              # Color constants
│   ├── ui.ts                  # UI text constants
│   └── index.ts               # Main constants export
├── hooks/
│   ├── useTeamStats.ts         # Team statistics logic
│   ├── useFilteredPeople.ts     # Filtering and sorting
│   └── usePeople.ts            # API data fetching
├── models/
│   └── types.ts               # TypeScript type definitions
├── services/
│   └── api.ts                 # API service with error simulation
├── store/
│   └── directoryStore.ts       # Zustand state management
└── utils/
    ├── directory.ts            # Data normalization
    └── helpers.ts              # Utility functions
```

## 🎨 UI/UX

### Design Principles
- **REM Units** - All spacing uses REM for accessibility
- **Emotion CSS** - Styled components for maintainability
- **Color Constants** - Centralized design system
- **Responsive Grid** - Auto-fit columns with minimum width
- **Loading Skeletons** - Match exact content dimensions
- **Smooth Animations** - Shimmer effects during loading

### Component Features
- **Hover States** - Interactive feedback on all buttons
- **Status Badges** - Color-coded active/inactive indicators
- **Skill Tags** - Visual skill representation
- **Action Buttons** - Promote, toggle active, move teams

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build         # Build for production
npm run preview       # Preview production build

# Code Quality
npm run build         # TypeScript compilation check
npm audit              # Security vulnerability scan
npm audit fix --force  # Fix security issues
```

## 📊 Example Usage

### Debug Controls
- **Skeleton Toggle** - Test loading states without API calls
- **Error Simulation** - Test error handling and retry logic
- **Reset State** - Clear all filters and return to initial state

### Filtering Examples
```typescript
// Filter by team
setSelectedTeam(TeamFilter.PLATFORM)

// Search by skill
setSearch('react')

// Sort by level
setSort(SortMode.LEVEL_DESC)
```

## 🎯 Learning Objectives

This exercise demonstrates:
- **Component Architecture** - Scalable, reusable React components
- **State Management** - Modern patterns with Zustand
- **Data Fetching** - Server state with TanStack Query
- **Loading States** - Professional skeleton implementations
- **Type Safety** - Full TypeScript integration
- **Modern CSS** - Emotion styled components with REM units
- **Error Handling** - Comprehensive error boundaries and retries
- **Performance** - Optimized filtering and rendering

Perfect for learning modern React development patterns and best practices! 🚀
