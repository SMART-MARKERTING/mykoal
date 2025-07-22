# Mykoal DeShazo - Business Portfolio Website

## Overview
This is a modern Linktree-style business portfolio website built with React, Express, and PostgreSQL. The application serves as a central hub for Mykoal DeShazo's various business ventures, featuring direct links to his websites and social media platforms. It's designed as a professional landing page that consolidates all of his business activities in one clean, mobile-first interface.

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
- June 27, 2025. Updated experience from "15 years" to "20+ combined team experience years" in about section and hero section
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
- June 27, 2025. Removed "Need Help After Hours?" emergency contact section from contact page
- June 27, 2025. Created comprehensive Privacy Policy and Terms of Service pages with NMLS #1912347 licensing integration, direct link to NMLS Consumer Access verification, regulatory compliance sections, and updated footer with proper navigation links
- June 27, 2025. Removed consultation scheduling references - changed "Free 30-minute consultation" to "Same-day rate quotes" and "Schedule Free Consultation" buttons to "Get Quote Today" and "Get Started Today"
- June 27, 2025. Created comprehensive Resources page with featured articles, financial calculators, loan product guides, market intelligence tools, and online pre-qualification tools; updated navigation to link to dedicated Resources page instead of blog section scroll
- June 27, 2025. Added social media links across website - Instagram: https://www.instagram.com/realmykoal/, Facebook: https://www.facebook.com/61577360476457, LinkedIn: https://www.linkedin.com/in/mykoal-deshazo-48134616a integrated into footer and contact sections with proper branding colors
- June 27, 2025. Enhanced Privacy Policy and Terms of Service pages with full navigation headers, footers, home buttons, cross-page navigation, comprehensive compliance content, NMLS licensing verification links, and proper Equal Housing Opportunity sections
- June 27, 2025. Fixed all "Get Started Today" buttons across website - updated goToContact functions in all landing pages (DSCR purchase, refinance, HELOC, personal loans, startup business loans, debt consolidation) and contact section to properly navigate to contact form with smooth scrolling functionality
- June 27, 2025. Fixed Equal Housing Opportunity logo colors - removed invert filters from white background pages (Resources, Privacy Policy, Terms of Service, Market Updates, Pre-qualification) to display black logo, kept white logo on dark backgrounds (footer, debt consolidation page)
- June 27, 2025. Added market updates email subscription feature - created subscription form on Market Updates page with email validation, backend API endpoint, database schema for market subscriptions, duplicate email handling, and success/error notifications for user feedback
- June 27, 2025. Created comprehensive About page with professional biographical content highlighting Mykoal's experience, expertise, industry recognition, and community involvement; integrated headshot image, contact information, professional credentials (NMLS #1912347), and proper navigation links throughout website
- June 27, 2025. Implemented comprehensive Quick Links navigation system across entire website - updated footer with proper navigation links (Mortgage Calculator, Lending Solutions, About Us, Resources, Contact), added Quick Links sidebar to About page, integrated Quick Links section to Resources page for seamless cross-page navigation
- June 27, 2025. Integrated live testimonials from Experience.com (4.91/5 rating, 54 verified reviews) - replaced placeholder testimonials with real client reviews, added direct link to Experience.com profile, updated trust indicators with authentic data including NMLS #1912347 verification
- June 27, 2025. Fixed Resources page navigation buttons - converted non-functional badges to clickable buttons with smooth scrolling to Educational Guides, Financial Calculators, and Market Data sections, updated styling for better visibility on blue background
- June 27, 2025. Fixed "Calculate Your DSCR" button in DSCR guide page - added proper Link navigation to DSCR purchase page
- June 27, 2025. Comprehensive Resources page mobile optimization and SEO enhancement - added proper meta tags, improved responsive design for hero section, Quick Links navigation, article cards, calculator cards, loan product guides, and market data sections; enhanced mobile button layouts with proper text sizing and spacing; optimized Equal Housing Opportunity section layout
- June 27, 2025. Updated website color scheme to Saratoga Water Blue - changed primary blue color from standard blue (hsl 220,87%,50%) to Saratoga Water Blue (hsl 195,100%,32%) across entire website including CSS variables, gradients, and component styling for consistent branding
- June 27, 2025. Fixed Quick Links navigation buttons in footer - replaced broken hash navigation with proper cross-page routing that navigates to home page and scrolls to correct sections (Mortgage Calculator, Lending Solutions, Contact) from any page
- June 27, 2025. Fixed Equal Housing Opportunity logo display across all pages - updated asset imports using proper Vite @assets path for footer, resources, privacy policy, terms of service, debt consolidation, market updates, and about pages; logos now display correctly on all pages
- June 27, 2025. Set up PostgreSQL database with permanent storage for all form submissions - created database schema, migrated from memory storage to DatabaseStorage class, initialized with sample data; all contact forms, quick quotes, pre-qualifications, and email subscriptions now permanently stored
- June 27, 2025. Added email capture forms to debt consolidation and DSCR landing pages - integrated quick quote functionality with loan amount, credit score, and email fields; forms submit to database and provide user feedback via toast notifications
- June 27, 2025. Implemented automatic email notifications using SendGrid - created comprehensive email service with templates for contact forms, quick quotes, pre-qualifications, and market subscriptions; all form submissions now trigger instant email notifications to mdeshazo@mykoal.com
- June 27, 2025. Added "Email Quote" functionality to both debt consolidation calculator and main mortgage calculator - users can now email detailed calculation results to themselves while being captured as leads; includes comprehensive email templates with loan details, payment breakdowns, and savings analysis
- June 27, 2025. Fixed live market news implementation - successfully integrated FOX Business RSS feed parsing to pull real-time real estate articles; implemented dynamic "Mykoal's Market Insights" generation based on actual news content; market updates page now displays live FOX Business articles with personalized investment strategy analysis and urgency indicators
- June 27, 2025. Fixed email template errors causing undefined property access issues - resolved .toFixed() method errors in calculation email templates by implementing safe property extraction with fallback defaults; email templates now handle missing properties gracefully; only remaining issue is SendGrid API key returning 403 Forbidden error requiring updated credentials
- June 27, 2025. Fixed market updates page navigation and subscription handling - added Home and Back navigation buttons to market updates page; implemented proper duplicate email handling for market subscriptions with user-friendly "already subscribed" message; both email calculation and market subscription functionality now working correctly with comprehensive error handling
- June 27, 2025. Fixed pre-qualification form submission error - resolved data transformation issue between frontend form and backend schema by adding all required optional fields with null values; pre-qualification form now completes successfully from start to finish without validation errors
- June 27, 2025. Fixed API request parameter order in email calculation functions - corrected apiRequest method calls in mortgage calculator and debt consolidation calculator components; enhanced error handling with console logging for better debugging; improved form validation with specific field error messages
- June 27, 2025. Enhanced debt consolidation email notifications with complete individual debt details including creditor names, balances, monthly payments, and debt types in formatted table for both customer and internal notifications; added Debt Consolidation tab to main navigation menu for direct access to debt consolidation analysis page
- June 27, 2025. Implemented complete professional email signature integration across all email templates including contact forms, quick quotes, pre-qualifications, market subscriptions, debt consolidation quotes, and calculation results; updated all emails to include Executive Loan Officer NMLS# 1912347 credentials, UWM Breakthrough Award Winner 2023, company licensing information, and full legal disclaimers as required
- January 9, 2025. Enhanced main page quote form with phone number field for better lead capture; updated database schema to support phone numbers in quick quotes; implemented dual email system sending notification to business and simple "we're working on your quote" auto-reply to customers
- January 9, 2025. Created comprehensive debt consolidation page email template that replicates exact website design including all graphics, styling, professional branding, calculations grid, benefits list, call-to-action sections, and Equal Housing Opportunity compliance; updated both debt consolidation page and calculator components to send complete website replica via email instead of simple text format
- January 9, 2025. Enhanced debt consolidation email template with detailed savings visualization section that replicates the attached image showing 16.8 years earlier payoff, $230,468 interest saved, and monthly cash flow improvement metrics; includes comprehensive "How Debt Consolidation Works for You" section with two savings options and detailed acceleration benefits when extra payments are applied
- January 10, 2025. Complete website rebranding to Jesus Christ centered mortgage loan officer - integrated biblical verses throughout all sections (hero, about, testimonials, contact, loan products, calculator), updated all headers and descriptions to emphasize faith-based service, Christ-centered values, and biblical principles while maintaining professional mortgage functionality; updated navigation branding, email signatures, and all client-facing messaging to reflect Christian faith integration
- January 10, 2025. Completely transformed About page to Christ-centered professional biography - added biblical verses throughout (Proverbs 3:5-6, Colossians 3:23, Ephesians 2:10, Colossians 3:17), updated all sections to reflect faith-based approach: "Called to Serve Through Faith", "Walking in Faith and Excellence", "Christian Values & Ministry", "My God-Given Mission"; transformed expertise cards to emphasize faith-based leadership, kingdom service, and excellence as unto the Lord; integrated Christian principles and church ministry involvement throughout personal and professional narrative
- January 10, 2025. Created comprehensive "Join My Team" page for recruiting Christ-following mortgage professionals - requires followers of Jesus Christ, offers complete training and licensing support, provides customer pipeline from day one, includes personal mentorship every step of the way, emphasizes faith-based career building with excellent income potential; integrated biblical verses (Matthew 28:19, Colossians 3:23, Matthew 6:33), team member testimonials, step-by-step process guide, FAQ section, and dedicated contact form for career inquiries
- January 10, 2025. Updated all email addresses throughout entire website from mdeshazo@mykoal.com to mdeshazo@independencehl.com; removed Business Loans section from Resources page including "Business Loan Fundamentals" article and category references; removed all statistics from hero section including "500+ Loans Funded" and "20+ Team Experience" for cleaner design; added complete company information to footer including Company NMLS 2524174, physical address (4343 N Scottsdale Rd, Scottsdale, AZ 85251), additional phone number (480) 805-5574, and comprehensive compliance disclaimer text throughout website footer
- January 10, 2025. Corrected email addresses back to mdeshazo@mykoal.com for SendGrid email delivery compatibility; enhanced email error handling with user-friendly messages directing to direct contact when email service is unavailable; identified SendGrid 403 Forbidden error requiring account configuration (email verification, domain authentication, or API key permissions)
- January 10, 2025. Major website simplification - removed all unnecessary pages and kept only 4 core pages: homepage, about page, join team page, and debt consolidation page; cleaned up navigation menus and footer to reflect simplified structure; deleted 15 page files including DSCR pages, blog pages, pre-qualification, market updates, resources, privacy policy, terms of service, and admin pages; streamlined App.tsx routing and navigation components for cleaner user experience
- January 10, 2025. Implemented external link integration for all action buttons - updated all "Get Quote", "Get Started", and similar CTA buttons across website to redirect to https://independencehl.com/mykoal-deshazo/ for centralized lead generation; modified hero section, navigation, about page, debt consolidation calculator, footer, and all landing pages to use external URL instead of internal contact form; ensured consistent email addresses using mdeshazo@mykoal.com throughout
- January 10, 2025. Removed all "Learn More" buttons from loan products section - simplified loan product cards to show only essential information (title, subtitle, features) with single "Get Quote" button redirecting to external lead generation page; streamlined user experience by eliminating redundant navigation options
- January 10, 2025. Complete website redesign to single-page application - consolidated all content (homepage, about, lending solutions, testimonials, contact) into one seamless page; removed all navigation and routing; simplified contact form to only collect name, email, phone, and loan description message; eliminated all separate pages and components for streamlined user experience
- January 10, 2025. Complete transformation to Linktree-style business portfolio - redesigned as mobile-first portfolio website featuring professional headshot, business links (DeShazo Wealth for mortgage/life insurance, Unykue.com for faith podcast), social media integration (Facebook, Instagram, YouTube), and contact information; eliminated all mortgage-specific content in favor of clean, professional business hub design

## User Preferences
Preferred communication style: Simple, everyday language.
Business owner: Mykoal DeShazo, NMLS #1912347
Email: mdeshazo@mykoal.com
Phone: (623) 280-8351, (480) 805-5574
Location: 4343 N Scottsdale Rd, Scottsdale, AZ 85251
Specialization: Investor loans, DSCR financing, investment property financing - many more options available