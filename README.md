# Device Protection Planner App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Objective

The Device Protection Planner web app is designed for Asurion to help users track protection plans for their devices and receive AI-generated recommendations for maintenance or upgrades. Key features of the app include:

- Track Device Protection Plans: Users can add, view, and manage their device protection plans.
- AI-Generated Recommendations: Receive tips, reminders, and upgrade suggestions based on device type and age.
- Showcase: Demonstrates frontend design, API development, cloud resource awareness, and generative AI capabilities.

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- PNPM (Package Manager)
- Supabase CLI
- Docker

#### 1. Clone the Repository

`git clone <https://github.com/nevermyuk/asurion-device-protection-planner.git>`

#### 2. Install Dependencies

`pnpm install`

#### 3. Setup database

Install Supabase CLI:

For macOS:
`brew install supabase/tap/supabase`

For Linux/Windows (via npm):
`npm install -g supabase`

For other installation methods, you can check the Supabase CLI documentation.

#### 4. Start Supabase locally

```bash
supabase start
supabase migration up
```

#### 5. Start the Supabase Instance

`supabase start`

#### 6. Setup Environment Variables

Update the variables in the .env file with your Supabase project's configuration.

`cp .env.example .env.local`

## Running the app

`pnpm dev`

Navigate to <http://localhost:3000> in your browser to view the app.

## Build for Production

To create a production build:
`pnpm build`

## Deployment

## Contributions

### 1. Create a new branch

`git checkout -b your-feature-branch`

### 2. Make Changes

Edit, add, or delete files as necessary for your feature or fix.

### 2. Commit changes

When you’re ready to commit your changes, use Commitizen to ensure your commit message follows the conventional commit format:
`npx cz`
