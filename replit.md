# Mykoal DeShazo - Business Portfolio Website

## Overview
This project is a modern, Linktree-style business portfolio website for Mykoal DeShazo. Its primary purpose is to serve as a central, mobile-first hub consolidating all of his business ventures and providing direct links to his various websites and social media platforms. It's designed as a professional landing page to streamline access to Mykoal's diverse business activities.

## User Preferences
Preferred communication style: Simple, everyday language.
Business owner: Mykoal DeShazo, NMLS #1912347
Email: mdeshazo@mykoal.com
Phone: (623) 280-8351, (480) 805-5574
Location: 4343 N Scottsdale Rd, Scottsdale, AZ 85251
Specialization: Investor loans, DSCR financing, investment property financing - many more options available

## System Architecture

### UI/UX Decisions
- **Design Style**: Linktree-style, mobile-first, clean, professional business hub.
- **Color Scheme**: Saratoga Water Blue (hsl 195,100%,32%) as the primary blue, with consistent branding across CSS variables and components.
- **Component Library**: shadcn/ui built on Radix UI primitives.

### Technical Implementation
- **Frontend**: React 18 with TypeScript, Vite for bundling, Tailwind CSS for styling, Wouter for lightweight client-side routing, and TanStack Query for server state management.
- **Backend**: Node.js with Express.js (TypeScript, ES modules), Drizzle ORM for type-safe database operations, and PostgreSQL (Neon serverless adapter) for data persistence.
- **Data Storage**: PostgreSQL with Drizzle ORM, supporting schema migrations via Drizzle Kit. In-memory storage is used as a development fallback.

### Feature Specifications
- **Core Functionality**: Display of professional headshot, direct business links (e.g., DeShazo Wealth, Unykue.com), social media integration (Facebook, Instagram, YouTube), and contact information.
- **Data Management**: Stores contact form submissions, quick quote requests, blog posts, and testimonials.
- **Email Notifications**: Automatic email notifications via SendGrid for form submissions and calculation results.

### System Design Choices
- **Build Process**: Vite for frontend static assets, esbuild for backend bundling.
- **Deployment**: Configured for Google Cloud Run (Node.js 20, PostgreSQL 16), running on port 5000.
- **Database Management**: Drizzle migrations for schema evolution, Neon for connection pooling and backups.

## External Dependencies

### Frontend Dependencies
- **@radix-ui/**: UI primitives.
- **@tanstack/react-query**: Server state management.
- **tailwindcss**: CSS framework.
- **wouter**: Routing library.
- **zod**: Runtime type validation.

### Backend Dependencies
- **express**: Web application framework.
- **drizzle-orm**: ORM for PostgreSQL.
- **@neondatabase/serverless**: Serverless PostgreSQL adapter.
- **connect-pg-simple**: PostgreSQL session store.
- **tsx**: TypeScript execution for development.
- **SendGrid**: Email service for notifications.

### Development Tools
- **vite**: Build tool.
- **typescript**: Static type checking.
- **drizzle-kit**: Database migration tool.
- **esbuild**: Production bundler.