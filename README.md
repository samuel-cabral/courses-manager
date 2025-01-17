# Course Management

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

### Production

To build the production version, run the following command:

```bash
pnpm build
```

## API Documentation

### Endpoints

- [x] `POST /users`: Create a new user with name, email, password (hashed) and register created at datetime.
- [x] `GET /users/:id`: Get a user by id.
- [x] `POST /courses`: Create a new course with title, description, start date, end date, and created at datetime.
- [x] `GET /courses`: Get all courses including the created at datetime.
- [x] `POST /enrollment`: Enrolls a user in a course, recording the date and time of the operation.
- [x] `GET /enrollment/:userId`: Lists the courses of a user (student), showing the enrollment dates adjusted to the client's timezone.

### Database Schema

- Users: id, name, email, password, created_at
- Courses: id, title, description, hours, created_at
- Enrollments: id, user_id, course_id, enrolled_at

### Authentication

- JWT

## Technical Choices

### Frontend Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- TypeScript
- React

### Why these technologies?

Next.js provides an excellent developer experience with features like server-side rendering, static site generation, and API routes - making it perfect for building a modern, performant web application. The combination with TypeScript ensures type safety and better maintainability, while Tailwind CSS and Shadcn UI allow for rapid development of a polished UI with consistent design patterns.

This tech stack was carefully chosen to demonstrate:

1. Modern Web Development Practices
   - Server Components for optimal performance
   - Type safety across the entire application
   - Component-driven architecture
   - Responsive design principles

2. Scalability & Maintainability 
   - Clear project structure following best practices
   - Strong typing with TypeScript
   - Reusable component library with Shadcn UI
   - Utility-first CSS approach with Tailwind

3. Developer Experience
   - Fast refresh during development
   - Great debugging tools
   - Excellent IDE support
   - Strong community and documentation

### Backend Stack

- Node.js
- Prisma
- Zod
- Postgres
- JWT Authentication

### Why this stack?

The API architecture leverages a powerful combination of modern technologies, each chosen with careful consideration:

Node.js & TypeScript
- Provides a robust, scalable foundation for building enterprise-grade APIs
- TypeScript adds strong typing and enhanced IDE support, reducing runtime errors
- Excellent performance for handling concurrent requests through its event-driven architecture
- Rich ecosystem of packages and tools for rapid development

Prisma
- Type-safe database access with auto-generated TypeScript types
- Intuitive data modeling and migration system
- Powerful query builder that prevents SQL injection
- Excellent developer experience with Prisma Studio for database management
- Supports complex relationships and transactions with minimal boilerplate

PostgreSQL
- Enterprise-grade relational database with ACID compliance
- Excellent performance for complex queries and relationships
- Rich feature set including JSON support and full-text search
- Battle-tested in production by major companies worldwide
- Strong community support and extensive documentation

Zod
- Runtime type validation that integrates seamlessly with TypeScript
- Ensures data integrity at API boundaries
- Reduces boilerplate through schema inference
- Excellent error messages and customization options
- Perfect for validating API requests and responses

JWT Authentication
- Stateless authentication reducing database load
- Industry-standard security practices
- Flexible token management for different access levels
- Easy integration with frontend frameworks
- Scalable across multiple servers

This architecture demonstrates:

1. Security & Reliability
   - Type-safe database operations
   - Input validation at all levels
   - Secure authentication practices
   - Data integrity through ACID compliance

2. Performance & Scalability
   - Efficient database queries
   - Connection pooling
   - Stateless authentication
   - Optimized data access patterns

3. Code Quality & Maintainability
   - Clean architecture principles
   - Domain-driven design
   - Comprehensive type safety
   - Clear separation of concerns

4. Developer Productivity
   - Automated type generation
   - Intuitive database migrations
   - Excellent debugging capabilities
   - Reduced boilerplate code
