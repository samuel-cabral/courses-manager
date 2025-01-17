# Course Management

## Overview

This monorepo is a course management system built with the following technologies:

### Frontend
- Next.js
- Tailwind CSS
- Shadcn UI
- TypeScript
- React

### API
- Node.js
- Prisma
- Zod
- Postgres
- JWT Authentication

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

```bash
pnpm dev
```

## Production

To build the production version, run the following command:

```bash
pnpm build
```

## Testing

To run the tests, run the following command:

```bash
pnpm test
```

## API

The API is built with the following technologies:

- Node.js
- Prisma
- Zod
- Postgres

### Endpoints

- [x] `POST /users`: Create a new user with name, email, password (hashed) and register created at datetime.
- [x] `GET /users/:id`: Get a user by id.
- [x] `POST /courses`: Create a new course with title, description, start date, end date, and created at datetime.
- [x] `GET /courses`: Get all courses including the created at datetime.
- [x] `POST /enrollment`: Enrolls a user in a course, recording the date and time of the operation.
- [x] `GET /enrollment/:userId`: Lists the courses of a user (student), showing the enrollment dates adjusted to the client's timezone.

## Database

- Postgres

### Schema

- Users: id, name, email, password, created_at
- Courses: id, title, description, hours, created_at
- Enrollments: id, user_id, course_id, enrolled_at

### Authentication

- JWT
