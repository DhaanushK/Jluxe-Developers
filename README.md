# JLUXE Developers

A modern digital platform for JLUXE Developers, a multi-vertical business ecosystem operating across real estate, business solutions, talent and training, and interiors and design.

## About JLUXE

JLUXE brings together property, business, branding, marketing, talent, training, and design solutions under one unified brand.

### Core Ecosystems

- JLUXE Real Estate Ecosystem
- JLUXE Business Solutions
- JLUXE Talent & Training
- JLUXE Interiors & Design

## Technology

- React
- TypeScript
- TanStack Start
- TanStack Router
- Vite
- Tailwind CSS
- React Query
- Node.js native SQLite (`node:sqlite`)

## Development

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd JLuxe
```

### Database setup

Phase 6 uses a local SQLite database at `data/jluxe.sqlite` by default. Copy
`.env.example` to `.env` when a custom `DATABASE_URL` is needed.

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

The seed command imports only approved ecosystem and service content from
`src/lib/site.ts`. Real-estate inventory, testimonials, insights, FAQs and
careers remain empty until verified content is supplied. Database access is
server-only through `src/server/repositories` and TanStack Start server
functions.