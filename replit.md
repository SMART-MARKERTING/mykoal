# Mykoal DeShazo - Investor Property Financing Platform

## Overview
This is a modern full-stack investor property financing website built with React, Express, and PostgreSQL. The application provides loan calculation tools, property financing information, contact forms, and quote request functionality. It's designed to help Mykoal DeShazo showcase his investor financing services and capture leads from potential clients.

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
- June 27, 2025. Updated to investor financing focus - DSCR loans, HELOC, investment property loans, personal loans
- June 27, 2025. Removed "Rate quotes in 60 seconds" text, added loan type selector to calculator with investor financing options
- June 27, 2025. Simplified loan calculator - removed down payment and additional costs, changed to direct loan amount input, updated hero section loan type dropdown
- June 27, 2025. Updated hero section with personalized welcome message emphasizing various lending options and unique scenarios
- June 27, 2025. Fixed white button visibility with blue background and removed starting rate section
- June 27, 2025. Created dedicated SEO-optimized landing pages for each lending solution with comprehensive content and "Learn More" navigation
- June 27, 2025. Integrated advanced effective interest rate calculations and extra payment functionality with Excel-level mathematical precision
- June 27, 2025. Fixed effective interest rate calculation to properly show rate reduction when extra payments are made
- June 27, 2025. Fixed extra payment input field zero display issue, removed trusted license section, updated phone to 623-280-8351, created SEO-optimized blog pages with proper "Read More" navigation
- June 27, 2025. Added "Get Quote" buttons to all lending solutions that link directly to contact form for lead capture
- June 27, 2025. Updated experience from "15 years" to "20+ combined team experience years" in about section
- June 27, 2025. Fixed all quote buttons on dedicated landing pages to properly redirect to main contact form instead of broken scroll functionality
- June 27, 2025. Created comprehensive debt consolidation loan page with interactive debt calculator, dynamic debt input system (3 initial debt types with add/remove functionality), integrated loan calculator, and complete SEO content
- June 27, 2025. Implemented complete online pre-qualification system with 4-step form (personal, financial, loan details, review), automatic qualification scoring algorithm, results dashboard with approval status, estimated rates, and integrated navigation
- June 27, 2025. Enhanced debt consolidation calculator to properly calculate monthly savings (current payments minus new loan payment) with option to apply savings as extra payment for accelerated payoff and interest savings
- June 27, 2025. Fixed pre-qualification form submission validation errors by properly transforming form data to match backend schema requirements and handling optional fields
- June 27, 2025. Fixed debt consolidation calculator interest savings displaying zero - now properly calculates and shows actual interest savings when extra payments are applied
- June 27, 2025. Fixed debt consolidation calculator years saved display - now only shows payoff acceleration when extra payments are actually applied, not potential savings
- June 27, 2025. Enhanced debt consolidation calculator extra payment interactivity - added clear button, confirmation message, and dynamic help text for better user experience
- June 27, 2025. Fixed debt consolidation calculator to dynamically update all calculations (total payments, interest savings, years saved) when extra payment amount is manually adjusted
- June 27, 2025. Fixed mortgage calculation library to properly return actual total interest paid when extra payments are applied, resolving interest savings calculation showing zero
- June 27, 2025. Redesigned homepage with integrated professional headshot, streamlined mobile-friendly layout, removed unnecessary sections, modernized hero section with personal branding
- June 27, 2025. Removed all MortgagePro references, updated to use only "Mykoal DeShazo" branding, changed from business loans to investor/property financing focus, updated location to Scottsdale Arizona, standardized phone to 623-280-8351, updated all dates to 2025
- June 27, 2025. Added optional monthly property tax and property insurance fields to both loan calculator and debt consolidation calculator with accurate total payment calculations
- June 27, 2025. Removed all sensitive financial information from pre-qualification page - eliminated date of birth, SSN, income, employment, credit score, debt, and assets fields, simplified to 3-step form with only contact info and loan details
- June 27, 2025. Added "Other" option to all loan type dropdowns across mortgage calculator, hero section quick quote, contact form, and pre-qualification page; replaced loan term dropdowns with text input fields allowing custom year entry (1-50 years) in both mortgage and debt consolidation calculators
- June 27, 2025. Created live market updates page with real-time mortgage rates from FRED API and Freddie Mac, news feeds from FOXBusiness and Mortgage News Daily RSS, MBS data from Mortgage News Daily, proper error handling for missing API keys with fallback to contact information
- June 27, 2025. Optimized market updates page with top 3 FOX Business articles only, AI-generated "Mykoal's Market Insights" analyzing news impact on rates with urgency indicators, mobile-first responsive design, comprehensive SEO optimization, regulatory compliance disclaimers including FRED data source attribution and Equal Housing Opportunity statements
- June 27, 2025. Refined market insights to be less aggressive about rate locking, more varied in content focus (investment opportunities, market trends, strategic positioning), with only one insight mentioning rate strategy instead of all three being rate-focused
- June 27, 2025. Moved rates section below Mykoal's Market Insights on Market Updates page, added Equal Housing Opportunity logo and compliance text universally across entire website including footer, pre-qualification, debt consolidation, and market updates pages
- June 27, 2025. Reorganized Market Updates page layout: moved Rate Disclaimer to top position, followed by Current Rates section above Mykoal's Market Insights, creating logical flow from compliance to data to analysis
- June 27, 2025. Cleaned up rate cards on Market Updates page by removing descriptive text ("Investment Property Rate", "Faster Equity Building", "High-Value Properties") to focus on loan types and rates only
- June 27, 2025. Fixed pre-qualification form validation error by updating database schema to make sensitive fields optional, created custom validation schema for removed fields (annualIncome, employmentType, creditScore), and implemented backend defaults for qualification scoring
- June 27, 2025. Replaced all temporary Equal Housing Opportunity "=" symbols with official EHO logo image across entire website (footer, market updates, pre-qualification, debt consolidation pages) with proper CSS filters for different background colors
- June 27, 2025. Fixed Equal Housing Opportunity logo image paths and made logo white color across all pages using brightness-0 invert CSS filters

## User Preferences
Preferred communication style: Simple, everyday language.
Business owner: Mykoal DeShazo, NMLS #1912347
Email: mdeshazo@mykoal.com
Phone: (623) 280-8351
Location: Scottsdale, Arizona
Specialization: Investor loans, DSCR financing, investment property financing - many more options available