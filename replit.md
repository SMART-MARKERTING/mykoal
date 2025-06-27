# MortgagePro - Full-Stack Mortgage Application

## Overview
This is a modern full-stack mortgage broker website built with React, Express, and PostgreSQL. The application provides mortgage calculation tools, loan product information, contact forms, and quote request functionality. It's designed to help mortgage professionals showcase their services and capture leads from potential clients.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Radix UI primitives with custom Tailwind themes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless adapter
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **API**: RESTful endpoints for contact forms and quote requests

### Data Storage
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM with code-first schema definition
- **Migrations**: Drizzle Kit for schema migrations
- **Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses four main tables:
- **contacts**: Stores contact form submissions with loan preferences
- **quick_quotes**: Captures quick quote requests with loan details
- **blog_posts**: Content management for mortgage-related articles
- **testimonials**: Client testimonials with ratings and photos

### Core Features
1. **Mortgage Calculator**: Interactive calculator with real-time payment calculations
2. **Quick Quote Form**: Lead capture form for instant rate quotes
3. **Contact System**: Comprehensive contact form with loan type selection
4. **Loan Products**: Information display for different mortgage types (Conventional, FHA, VA)
5. **Testimonials**: Dynamic testimonial display from database
6. **Blog Section**: Content management for mortgage education articles

### UI Components
- Custom mortgage calculator with synchronized inputs
- Responsive navigation with smooth scrolling
- Form validation using Zod schemas
- Toast notifications for user feedback
- Mobile-responsive design with Tailwind breakpoints

## Data Flow

### Contact Form Flow
1. User fills out contact form with personal and loan information
2. Frontend validates data using Zod schema
3. POST request sent to `/api/contacts` endpoint
4. Server validates and stores contact in PostgreSQL
5. Success notification displayed to user
6. Email notification triggered (implementation pending)

### Quick Quote Flow
1. User enters loan amount, credit score, and property type
2. Frontend validation ensures required fields are complete
3. POST request sent to `/api/quick-quotes` endpoint
4. Server processes and stores quote request
5. User receives confirmation of quote submission

### Content Display Flow
1. Components query API endpoints for dynamic content
2. TanStack Query manages caching and loading states
3. Fallback to loading skeletons during data fetch
4. Error boundaries handle failed requests gracefully

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitives for forms and navigation
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **zod**: Runtime type validation for forms

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL adapter
- **connect-pg-simple**: PostgreSQL session store
- **tsx**: TypeScript execution for development

### Development Tools
- **vite**: Build tool with hot reload
- **typescript**: Static type checking
- **drizzle-kit**: Database migration tool
- **esbuild**: Production bundling for server

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Server Build**: esbuild bundles TypeScript server to `dist/index.js`
3. **Database Setup**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **Development**: Uses tsx for hot reload with Vite middleware
- **Production**: Serves static files from Express with compiled bundle
- **Database**: Connects to PostgreSQL via DATABASE_URL environment variable

### Replit Deployment
- **Platform**: Google Cloud Run
- **Commands**: `npm run build` for build, `npm run start` for production
- **Modules**: Node.js 20, PostgreSQL 16, web hosting
- **Port**: Application runs on port 5000 in development

### Database Management
- **Schema Evolution**: Uses Drizzle migrations for version control
- **Connection Pooling**: Neon serverless handles connection management
- **Backup Strategy**: Relies on Neon's built-in backup and recovery

## Changelog
- June 27, 2025. Initial setup
- June 27, 2025. Personalized website for Mykoal DeShazo with NMLS #1912347, removed interest rate section

## User Preferences
Preferred communication style: Simple, everyday language.
Business owner: Mykoal DeShazo, NMLS #1912347