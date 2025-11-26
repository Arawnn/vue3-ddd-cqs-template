
# 🚀 Getting Started

Follow this guide to set up the project locally.

## Prerequisites

- **Node.js**: v20.19.0 or higher
- **npm**: v10.x or higher

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vue3-ddd-cqrs-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and configure your variables:

   ```properties
   VITE_APP_NAME="My App"
   VITE_SUPABASE_URL="your-supabase-url"
   VITE_SUPABASE_ANON_KEY="your-supabase-key"
   ```

## 🏃‍♂️ Running the Project

### Development Server

Starts the Vite development server with hot module replacement (HMR).

```bash
npm run dev
```

Access the app at `http://localhost:5173`.

### Production Build

Type-checks and builds the application for production.

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🧪 Testing

### Unit Tests

Runs unit tests using Vitest.

```bash
npm run test:unit
```

### End-to-End Tests

Runs E2E tests using Playwright.

```bash
# Install browsers (first time only)
npx playwright install

# Run tests
npm run test:e2e
```

## 🧹 Linting & Formatting

Lint the code using ESLint:

```bash
npm run lint
```

Format the code using Prettier:

```bash
npm run format
```

## 🔧 Project Structure

- `src/main.ts`: Entry point
- `src/features/`: Feature modules (Auth, Dashboard, etc.)
- `src/core/`: Shared domain and infrastructure
- `src/shared/`: Shared UI components
