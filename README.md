# Course Management

## Overview

This monorepo is a course management system. It is built with the following technologies:

## Frontend

- Next.js
- Tailwind CSS
- Shadcn UI
- TypeScript
- React

## API

The API is built with the following technologies:

- Node.js
- Prisma
- Zod
- Postgres

### Endpoints

- `POST /users`: Create a new user with name, email, password (hashed) and register created at datetime.
- `GET /users/:id`: Get a user by id.
- `POST /courses`: Create a new course with title, description, start date, end date, and created at datetime.
- `GET /courses`: Get all courses including the created at datetime.
- `POST /enrollment`: Enrolls a user in a course, recording the date and time of the operation.
- `GET /enrollment/:id`: Lists the courses of a user (student), showing the enrollment dates adjusted to the client's timezone.

## Getting Started

To get started, run the following command:

```bash
pnpm install
```

## Development

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
