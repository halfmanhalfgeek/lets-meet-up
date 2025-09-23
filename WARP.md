# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Let's Meet Up** is a modern web application for coordinating meetups with friends. It eliminates the endless back-and-forth messaging by providing smart scheduling, venue suggestions, and group voting features.

**Key Technologies:**
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Real-time subscriptions)
- **Testing:** Vitest (unit/integration), Playwright (E2E)
- **Deployment:** Vercel

## Essential Commands

### Development
```bash
npm run dev           # Start dev server with Turbopack
npm run build         # Build for production with Turbopack  
npm run start         # Start production server
```

### Testing
```bash
npm run test          # Run unit tests with Vitest (watch mode)
npm run test:run      # Run unit tests once
npm run test:ui       # Run tests with Vitest UI
npm run test:e2e      # Run E2E tests with Playwright
npm run test:e2e:ui   # Run E2E tests with Playwright UI
```

### Code Quality
```bash
npm run lint          # Run ESLint
```

### Running Individual Tests
```bash
npx vitest run src/test/utils.test.ts           # Run specific unit test
npx playwright test src/e2e/homepage.spec.ts   # Run specific E2E test
```

## Architecture Overview

### High-Level Structure
This is a **full-stack application** built around Supabase as the central backend service. The architecture follows these key principles:

- **Single-Page Application (SPA)** with Next.js App Router for routing
- **Serverless deployment** on Vercel with Supabase handling all backend services
- **Real-time collaboration** through Supabase subscriptions for live group updates
- **Mobile-first responsive design** with Tailwind CSS
- **Comprehensive testing strategy** with both unit and E2E coverage

### Core Domain Models

The application centers around **groups**, **events**, **availability coordination**, and **consensus building**:

1. **Users & Groups:** Users create/join groups via invite codes, with role-based permissions
2. **Events:** Each group can create events that go through states: `draft` → `voting` → `confirmed` → `cancelled`
3. **Availability Coordination:** Time slot proposals with user availability responses (`available`/`unavailable`/`maybe`)
4. **Venue Management:** API-sourced and user-proposed venues with geographic fairness calculations
5. **Voting & Consensus:** Democratic decision-making for times and venues with real-time updates

### Database Architecture (Supabase)

**Key Tables:**
- `users` - User profiles (extends Supabase auth.users)
- `groups` - Group information with invite codes
- `group_members` - Many-to-many user-group relationships
- `events` - Event lifecycle management
- `timeslots` - Proposed meeting times
- `timeslot_responses` - User availability for time slots
- `venues` - Location data (API-sourced or manual)
- `votes` - Democratic voting on times and venues
- `user_preferences` - Food, activity, accessibility preferences

**Important Features:**
- **Row Level Security (RLS)** enforces data access permissions
- **Real-time subscriptions** for live updates across the group
- **Geographic calculations** for fair venue suggestions
- **Complex voting algorithms** with consensus mechanisms

### Code Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication flows
│   ├── dashboard/         # Main application interface
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # Reusable UI components (buttons, cards, inputs)
│   ├── layout/           # Layout-specific components
│   └── providers/        # Context providers
├── contexts/              # React contexts (auth, etc.)
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client configuration
│   ├── database-schema.sql # Complete database schema
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
│   └── database.ts       # Database types and interfaces
├── test/                  # Unit test utilities
└── e2e/                   # Playwright E2E tests
```

## Environment Setup

### Required Environment Variables
Copy `.env.local.example` to `.env.local` and configure:

```env
# Required for development
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Future API integrations (optional)
# GOOGLE_CALENDAR_CLIENT_ID=...
# GOOGLE_PLACES_API_KEY=...
# YELP_API_KEY=...
```

### Database Setup
Execute the complete schema from `src/lib/database-schema.sql` in your Supabase SQL Editor. This creates:
- All tables with proper relationships
- Indexes for performance
- Row Level Security policies
- Real-time triggers
- Automated timestamp updates

## Development Patterns

### Supabase Integration
- **Client-side:** Use `createClient()` from `src/lib/supabase/client.ts`
- **Server-side:** Use server client for protected routes
- **Real-time:** Subscribe to table changes for live updates
- **Authentication:** Leverage Supabase Auth with email/OAuth providers

### Component Architecture
- **UI Components:** Located in `src/components/ui/` following a design system approach
- **Layout Components:** Handle navigation and page structure
- **Context Providers:** Manage global state (authentication, etc.)

### Type Safety
- **Database Types:** All tables have corresponding TypeScript interfaces in `src/types/database.ts`
- **API Responses:** Structured response types for consistent data handling
- **Form Inputs:** Validated input types for all user interactions

### Testing Strategy
- **Unit Tests:** Focus on business logic and utility functions
- **Integration Tests:** Test Supabase interactions and component integration
- **E2E Tests:** Simulate complete user workflows including real-time features
- **Test Environment:** Uses jsdom for DOM testing with Vitest

## Key Implementation Details

### Real-time Features
The application heavily relies on Supabase real-time subscriptions for:
- Live group membership updates
- Event status changes
- Vote tallying and consensus updates
- Availability coordination across group members

### Geographic Calculations
Venue suggestions use geographic fairness algorithms to find equidistant locations for all group members, ensuring no one is unfairly burdened with travel.

### Mobile-First Design
Built with Tailwind CSS using a mobile-first approach with responsive breakpoints for larger screens. Emphasizes touch-friendly interfaces and accessibility.

### Data Privacy
- **Location sharing** configurable at user level (exact/city/none)
- **Calendar visibility** controls what scheduling information is shared
- **Group-scoped data** ensures information only visible to relevant group members

## Future Roadmap

Based on the design documents, planned features include:
- **Calendar Integration** (Google Calendar, Outlook)
- **External Venue APIs** (Google Places, Yelp, Eventbrite)
- **Push Notifications** for real-time alerts
- **Advanced Voting Algorithms** for complex consensus scenarios
- **Activity Recommendations** based on group preferences

## Testing Notes

- **E2E tests run against built application** (not dev server) for production-like testing
- **Database integration tests** require proper Supabase project setup
- **Real-time features** explicitly tested for concurrency and sync integrity
- **Accessibility testing** included in E2E test suite