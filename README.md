# Simple Hono App with Midtrans and JWT Authentication

This is a simple application built with Hono, integrating Midtrans for payment processing and JWT for authentication. This project is created for learning and experimentation purposes.

## Specifications

- **Framework**: Hono
- **Payment Gateway**: Midtrans
- **Authentication**: JSON Web Token (JWT)
- **ORM**: Prisma
- **Database**: Supabase

## Features

- User authentication with JWT.
- Create transactions with Midtrans.
- Validate transaction data using Zod.
- Custom error handling.
- Clean architecture implementation.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
    ```
2. Install dependencies:
3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DATABASE_URL=""
   DIRECT_URL=""
   SUPABASE_URL=""
   SUPABASE_KEY=""
   ACCESS_TOKEN_SECRET=""
   REFRESH_TOKEN_SECRET=""
   MERCHANT_ID=""
   CLIENT_KEY=""
   SERVER_KEY=""
   ```
4. Run the development server:
   ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
6. You can now start making requests to the API.
7. To run tests:
   ```bash
   npm run test
   ```
8. To build the project:
   ```bash
     npm run build
     ```
9. To start the production server:
   ```bash
   npm start
   ```
10. To generate Prisma client:
    ```bash
    npx prisma generate
    ```
11. To run migrations:
    ```bash
    npx prisma migrate dev
    ```
12. To generate a new migration:
    ```bash
    npx prisma migrate dev --name your-migration-name
    ```
13. To seed the database:
    ```bash
    npx prisma db seed
    ```
14. To reset the database:
    ```bash
    npx prisma migrate reset
    ```

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.
- **POST /api/transactions**: Create a new transaction.

# Thank you! 🚀
```