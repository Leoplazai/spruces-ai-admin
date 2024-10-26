# Spruces AI Admin Dashboard

Admin dashboard for managing cleaning service operations.

## Features

- Customer Relationship Management (CRM)
  - Lead tracking (Cold, Warm, Hot)
  - Customer profiles
  - Interaction history
  - Notes management

- Booking Management
  - Calendar integration
  - Service scheduling
  - Assignment system
  - Customer selection

- Cleaner Management
  - Profile management
  - Availability tracking
  - Performance metrics
  - Document verification

- Billing System
  - Customer invoicing
  - Cleaner payments
  - Revenue tracking
  - Payment history

- Communication
  - Real-time chat with customers
  - Real-time chat with cleaners
  - Notification system

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Database:** Supabase (planned)
- **Calendar:** Google Calendar Integration (planned)
- **Deployment:** Vercel

## Project Structure
spruces-ai-admin/
├── src/
│   ├── pages/          # Application pages
│   │   └── index.js    # Main dashboard
│   └── styles/         # Global styles
│       └── globals.css
├── public/            # Static files
└── package.json      # Dependencies
Copy
## Development

1. Clone and install:
```bash
git clone https://github.com/[your-username]/spruces-ai-admin.git
cd spruces-ai-admin
npm install

Run development server:

bashCopynpm run dev

Open http://localhost:3000

Deployment
The application is deployed on Vercel with automatic deployments from the main branch.
Future Implementations

Supabase integration for data management
Google Calendar API integration
Payment processing system
Mobile responsiveness improvements
Advanced reporting features
