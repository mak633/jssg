# UI

## Data Decisions

Mock data is in `packages/shared/src/lib/dummy-data.ts` and is created based on backend ideas presented in the BE folder.
The main idea is to use an advanced Adjacency List Graph (Decision Tree Algorithm) for creating data in the backend.

## Frontend Decisions

### Architecture

#### Monorepo

Uses Turbo [https://turborepo.com/](https://turborepo.com/) (monorepo) to split non-coupled logic and create 3 main apps:

- **Login** - where users/admins can login and register
- **Portal** - where users can take weekly quizzes, with other functionality to be added later
- **Admin** - where admins manage the app. The assumption was to create functionality for building quizzes, managing users, etc.

The project also includes packages with the following folders:

- **config** - for TypeScript configuration
- **eslint-config** - for code rules
- **shared** - where shared components, hooks, types, etc. are added

Using a monorepo creates a microservices architecture that allows us to download only the chunks of data that are needed.

#### Next.js

The frontend is based on Next.js, which provides server-side rendering (SSR) capabilities that can boost performance.
It can also be used as a client-based app like a regular React application.

#### PNPM

A performant package manager [https://pnpm.io/](https://pnpm.io/) that comes by default with Turbo and supports workspaces where dependency versions remain consistent.

#### shadcn/ui

For UI components, we use the shadcn/ui system [https://ui.shadcn.com/](https://ui.shadcn.com/), which is mostly based on [https://www.radix-ui.com/](https://www.radix-ui.com/).
shadcn/ui can be easily modified for each project. Reusable components are located in `packages/shared/components`.

#### Tailwind CSS

[https://tailwindcss.com/](https://tailwindcss.com/) is used to boost development speed and can be modified to add new color schemes, mobile breakpoints, etc. It has good tree shaking, which removes all unused styles from the compiled bundle.

#### TanStack Query (React Query)

[https://tanstack.com/query/latest](https://tanstack.com/query/latest) allows us to simplify API connections and memoize requests.

#### i18next

[https://www.i18next.com/](https://www.i18next.com/) is a localization package that helps add multiple languages and allows us to keep only string keys in our database instead of full strings.

#### Zod and React Hook Form

[https://zod.dev/](https://zod.dev/) and [https://react-hook-form.com/](https://react-hook-form.com/) help create forms with dynamic validation.

#### Jest and Playwright

Jest is used to write unit and some integration tests (only some tests were written due to limited time).
Playwright is connected for adding e2e tests.

#### React Practices

Uses a modified ATOMIC approach for creating components.

#### Docker

Connected to improve development and deployment. Developers can run everything in Docker and work only on the backend part, or run locally only the project they are going to modify.

## How to Run

### Required Dependencies

- **Docker**
- **Node.js** (at least 20.19.0)
- **Brew** (optional)
- **PNPM** [https://pnpm.io/](https://pnpm.io/)
- **Docker Compose** dependencies
- **Dotenv** [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) for environment variables
- **Linux terminal** to use the `make` command
- Make sure ports **2000**, **2001**, **2002** are available

### Docker Run

From the root folder, run:

```bash
docker compose up -d --build
```

### Local Development

From the root folder, install dependencies:

```bash
pnpm i
```

Run the project you want to modify:

- **Login**: `make dev app=login` or `dotenv -- pnpm w login dev`
- **Portal**: `make dev app=portal` or `dotenv -- pnpm w portal dev`
- **Admin**: `make dev app=admin` or `dotenv -- pnpm w admin dev`

To improve the development experience, 2 projects can be run in Docker and 1 in the terminal.

### Other Helpful Commands

- `pnpm format:fix` - format code
- `pnpm lint:fix` - fix and show linting issues
- `pnpm test` - run tests

## Mock Data

User data and tokens for login are stored in cookies. Cookies were chosen because they can be used across different ports (unlike localStorage) and cookies are more secure for storing tokens.

## Links

- [http://localhost:2000/](http://localhost:2000/) - Login
- [http://localhost:2000/admin](http://localhost:2000/admin) - Admin login (hidden link)
- [http://localhost:2001/](http://localhost:2001/) - Portal (quiz)
- [http://localhost:2002/](http://localhost:2002/) - Admin portal

## Credentials:

- User - email: john@example.com , password: password123
- Admin (can be logged in admin and in portal) - email: jane@example.com , password: password456

# BE
<img width="692" height="644" alt="Decisions and requirements" src="https://github.com/user-attachments/assets/52b7e2b7-bf84-49ba-916a-c3b43d09d9fb" />
<img width="752" height="1007" alt="DB structure" src="https://github.com/user-attachments/assets/c8bb16ac-479b-4ecc-b39b-258a6244f7c8" />

