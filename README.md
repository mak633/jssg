# UI for J. Safra Sarasin

## Data decisions
Mock data what is packages/shared/src/lib/dummy-data.ts created based on BE ideas what are presented in BE folder.
Main idea to use advanced Adjacency list Graph (Decision Tree Algorithm) for creating a data in BE.

## Frontend decisions

### Architure

#### Monorepo
Use turbo [https://turborepo.com/](https://turborepo.com/) (monorepo) for split non coupled logic and created 3 main apps:
* Login - where user/admin can login and make registration
* Portal - where user can pass weekly quiz, other functionality can be added later
* Admin - where admin manange app. Assumption was to make functionality for build quiz, manage users, ect. \
Also project includes packages with next folders:
* config - for TypeScript config
* eslint-config - for code rules
* shared - where added shared components, hooks, types, etc.

Using monorepo creates micro services arhitecture what allows us to download only that chunks of data what are needed.

#### Next.JS
Based for FE is Next.JS what can give us an opportunity for server side rendering (SSR) what can boost the performance.
It also can be used as only for client based apps like regular React application.

#### PNPM
Performent package manager [https://pnpm.io/](https://pnpm.io/) what goes by default to turbo and support workspace where vesrions of dependencies remain the same.

#### shadcn
For UI components used shadcn system [https://ui.shadcn.com/](https://ui.shadcn.com/) what mostly based on [https://www.radix-ui.com/](https://www.radix-ui.com/). \
Shadcn can be easily modified for each project, reused components are based in packages/shared/components

#### Tailwind
[https://tailwindcss.com/](https://tailwindcss.com/) used for boosting development, can be modified to add new color scheme, mobile break points, etc. Has a good tree shaking, what removes all unused styles for complied chunk.

#### UseQuery
[https://tanstack.com/query/latest](https://tanstack.com/query/latest) allow us to simplify API connection and memoise requests.

#### i18next
[https://www.i18next.com/](https://www.i18next.com/) Localization package what helps to add more langueges and helps us to keep only string key in our DB and not whole string.

#### Zod and React hook form
[https://zod.dev/](https://zod.dev/) and [https://react-hook-form.com/](https://react-hook-form.com/) help to create form and dynamic validation.

#### Jest and Playwhight
Jest used to write unit and some intergration tests (only some tests were written due to limited time)
Playwhight were connected for adding e2e tests.

### React practice

Used modified ATOMIC appoarch for creating components

### Docker 
Connect for impove development and deployment. Developers are able to run everything in docker and work only on BE part or run locally only that project what they are going to modify

### How to run
#### Required dependencies
* Docker
* Node.JS (at least 20.19.0)
* Brew (optional)
* PNPM [https://pnpm.io/](https://pnpm.io/)
* Dependecies to run docker-compose or docker compose
* Dotenv [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) for env variables
* Linux terminal to use comman `make`
* Make sure that ports 2000, 2001, 2002 are available

#### Docker run
From root folder run `docker compose up -d --build`

#### Local developmet
From root folder install devependencies: `pnpm i`\
Run project what you want to modify:
* `make dev app=login` or `dotenv -- pnpm w login dev`
* `make dev app=portal` or `dotenv -- pnpm w poral dev`
* `make dev app=admin` or `dotenv -- pnpm w admin dev` \
To improve development experience 2 projects can ve run in docker and 1 in terminal

#### Other helpful commands
* `pnpm format:fix` - format code
* `pnpm lint:fix` - fix and show linting issues
* `pnpm test` - run tests

### Mock data
User data and token for login are in cookies. Cookies were chosen because they can be used in different port instead of localstorage plus cookies are more secure for keeping token.

### Links 
* [http://localhost:2000/](http://localhost:2000/) - login
* [http://localhost:2000/admin](http://localhost:2000/admin) - admin login (hidden link)
* [http://localhost:2001/](http://localhost:2001/) - portal (quiz)
* [http://localhost:2002/](http://localhost:2002/) - admin portal

