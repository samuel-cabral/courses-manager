# Course Management

## Demo

You can try out the live demo at [https://courses-manager-web.vercel.app/](https://courses-manager-web.vercel.app/)

Use these credentials to log in:
- Email: john@example.com
- Password: 123456

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- pnpm package manager
- Docker

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samuel-cabral/courses-manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd courses-manager
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the `apps/api` directory.
   - Provide the required environment variables:
     - `DATABASE_URL`: The URL of the PostgreSQL database.
     - `JWT_SECRET`: The secret key for JWT authentication.
     - `NEXT_PUBLIC_API_URL`: The URL of the API.

5. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

6. Run the database migrations:
   ```bash
   pnpm prisma migrate dev
   ```

7. Seed the database (optional):
   ```bash
   pnpm prisma db seed
   ```

### Development

To start the development server, run the following command:
