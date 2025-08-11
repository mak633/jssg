## How to run

run project: `make dev app=login`

## Adding Shadcn components

add shadcn component: `pnpm ui:add <component>`

## How to run e2e tests

> In each project there is a npm script named `e2e`, just which runs the playwright cli, meaning you can pass any valid playwright command to it.

```bash
dotenv -- pnpm w <workspace> e2e <playwright-command>
```

For example:

```bash
dotenv -- pnpm w login e2e test
```
