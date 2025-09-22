# Let's Meet Up

A modern web application for coordinating meetups with friends. Stop the endless back-and-forth messaging and make planning gatherings simple and stress-free.

## Features

- **Easy Scheduling**: Share your availability and find the perfect time for everyone to meet
- **Smart Venues**: Get suggestions for meetup locations that are fair and convenient for all
- **Quick Voting**: Vote on times and places with simple, intuitive controls  
- **Group Management**: Easily create and manage groups with simple invite links
- **Real-time Updates**: See changes instantly as your group makes decisions
- **Mobile-First**: Fully responsive design that works great on any device

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Supabase Auth with email/password and OAuth (Google, GitHub)
- **Deployment**: Vercel
- **Testing**: Vitest (unit/integration), Playwright (E2E)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn
- A Supabase account and project

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lets-meet-up
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   In your Supabase project dashboard, go to the SQL Editor and run the schema from:
   ```
   src/lib/database-schema.sql
   ```
   
   This will create all the necessary tables, indexes, RLS policies, and functions.

5. **Configure authentication providers** (Optional)
   
   In your Supabase dashboard, go to Authentication > Providers and configure:
   - Google OAuth (optional)
   - GitHub OAuth (optional)
   
   Make sure to add your domain to the allowed redirect URLs.

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:run` - Run tests once
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI

## Testing

The project includes comprehensive testing setup:

### Unit & Integration Tests (Vitest)
```bash
npm run test
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

## Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set up environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

2. **Environment Variables for Production**
   Set these in your Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`

### CI/CD Pipeline

The project includes a GitHub Actions workflow that:
- Runs linting and type checking
- Executes unit and integration tests
- Runs E2E tests on pull requests
- Deploys preview builds for PRs
- Deploys to production on main branch

Required GitHub Secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── layout/           # Layout components
├── contexts/              # React contexts
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase clients
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
├── test/                  # Unit test utilities
└── e2e/                   # End-to-end tests
```

## Next Steps

This is the initial MVP scaffolding. The following features are ready to be implemented:

1. **Group Management**: Create and join groups with invite codes
2. **Event Creation**: Set up meetups with your groups
3. **Availability Coordination**: Share when you're free and find optimal times
4. **Venue Suggestions**: Integrate with mapping APIs for location recommendations
5. **Voting System**: Let groups vote on times and places
6. **Real-time Updates**: See changes as they happen

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help setting up the project, please open an issue in the GitHub repository.
