# event-driven-ecommerce-frontend

A Next.js frontend for an event-driven ecommerce proof of concept. This application provides a simple, modern storefront experience with product browsing, cart management, order creation, Stripe Checkout redirection, and order history.

## Overview

This frontend is built using Next.js App Router and is designed to work with a backend API that implements product listing, order creation, payment session creation, and payment/cancellation handling. It is intended as the client-facing layer of a cloud-native, event-driven ecommerce system.

## Key Features

- Product catalog with paginated product listing
- Product detail page with add/remove cart controls
- Global cart state management using Zustand
- Checkout flow that creates an order and starts a Stripe Checkout session
- Payment status handling for success and cancellation
- Order history page with paginated order list
- Uses Ant Design components for UI and Tailwind styles for layout
- Docker-ready standalone Next.js build

## Architecture

The application uses the Next.js `app/` directory structure and is organized into the following main flows:

- `/ecom` — storefront product listing and pagination
- `/ecom/product/[id]` — individual product detail page
- `/checkout` — cart review and payment initiation
- `/payment/status` — payment result handling
- `/orders` — order history and details

### State Management

- `app/store/cartStore.ts` manages cart items, item quantities, removal, and cart clearing.
- `app/store/userStore.ts` stores the currently active user context required for order creation and payment.

### API Integration

This frontend relies on the backend API base URL provided by the `NEXT_PUBLIC_API_URL` environment variable. It interacts with endpoints such as:

- `GET /product/list?page=&limit=`
- `GET /product/:id`
- `POST /order`
- `GET /order/list?userId=&page=&limit=`
- `POST /payment/create-checkout-session`
- `POST /payment/cancel`

## Setup

### Prerequisites

- Node.js 20+
- npm
- A backend API available and reachable from this frontend

### Environment Variables

Create a `.env.local` file in the project root with at least the following variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.example.com
```

This value must point to the backend service that supports the required ecommerce endpoints.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app at:

```bash
http://localhost:3000
```

## Build and Start

Build the production app:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Docker

Build and run the Docker image:

```bash
docker build -t event-driven-ecommerce-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-backend-api.example.com event-driven-ecommerce-frontend
```

## Project Structure

- `app/` — Next.js app routes, pages, and layouts
- `components/` — reusable UI components such as `ProductCard`
- `public/` — static assets and images
- `app/store/` — Zustand stores for cart and user state
- `Dockerfile` — production Docker build definition
- `next.config.ts` — standalone Next.js build configuration

## Notes

- The current implementation sets a demo user in several pages for local development. In production, user identity should be loaded from an authenticated session.
- The checkout flow expects the backend to return a Stripe Checkout URL. After redirection, `/payment/status` is used to display success or failure and restore state.
- The app uses a standalone build output so the Docker image contains only the necessary runtime files.

## Future Scope

- Add user authentication and authorization to replace the hardcoded demo user.
- Support login, signup, password reset, and session persistence.
- Implement user-specific profiles, saved addresses, and order history tied to authenticated users.
- Add role-based access control for admin and customer interfaces.
- Integrate secure token storage and refresh token handling for long-lived sessions.
