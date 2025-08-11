.PHONY: dev
dev:
	dotenv -- pnpm w $(app) dev

.PHONY: format
format:
	pnpm format --write

.PHONY: lint
lint:
	pnpm lint -- --fix