.PHONY: dev dev-api dev-web build build-api build-web install clean \
        up down build rebuild logs ps \
        db-up db-down db-logs db-reset \
        migrate-gen migrate-run migrate-revert \
        lint format prod prod-deploy

# ── Development ──────────────────────────────────────────────

dev:              ## Start API hot-reload
	npm run dev

install:          ## Install all dependencies
	npm ci

build:            ## Build API + Web for production
	npm run build

clean:            ## Remove build artifacts and node_modules
	rm -rf dist apps/api/dist apps/web/.next node_modules

# ── Docker — Local Development ───────────────────────────────

up:        ## Start PostgreSQL (local dev DB)
	docker compose up -d postgres

down:      ## Stop all Docker containers
	docker compose down

logs:      ## Tail logs from all containers
	docker compose logs -f

ps:        ## Show running containers
	docker compose ps

# ── Docker — Production Build ────────────────────────────────

build:     ## Build production Docker images
	docker compose build

rebuild:   ## Rebuild all images from scratch (no cache)
	docker compose build --no-cache

prod-up:          ## Start full production stack (postgres + api + web + caddy)
	docker compose up -d --build

prod-down:        ## Stop production stack
	docker compose down

prod-logs:        ## Tail production logs
	docker compose logs -f

prod-restart:     ## Restart production stack
	docker compose down && docker compose up -d --build

# ── Database ─────────────────────────────────────────────────

db-up:            ## Start PostgreSQL only
	docker compose up -d postgres

db-down:          ## Stop PostgreSQL
	docker compose stop postgres

db-logs:          ## Tail PostgreSQL logs
	docker compose logs -f postgres

db-reset:         ## Wipe PostgreSQL data volume
	docker compose down -v postgres && docker compose up -d postgres

db-shell:         ## Open psql shell
	docker compose exec postgres psql -U postgres -d saas_lite_db

# ── Migrations ───────────────────────────────────────────────

migrate-gen:      ## Generate a new TypeORM migration
	npm run migration:generate

migrate-run:      ## Run pending migrations
	npm run migration:run

migrate-revert:   ## Revert last migration
	npm run migration:revert

# ── Deployment — VPS ────────────────────────────────────────

prod-deploy:      ## Full production deploy (build + start)
	@test -f .env || (echo "ERROR: .env file missing. Run: cp .env.example .env" && exit 1)
	@test -n "$$DOMAIN" || (echo "ERROR: DOMAIN not set in .env. Caddy needs it for SSL." && exit 1)
	docker compose down
	docker compose up -d --build
	@echo "Deployed! Check: docker compose logs -f"

prod-status:      ## Show production container status
	@docker compose ps
	@echo ""
	@echo "Health checks:"
	@docker compose exec api wget -qO- http://localhost:3000/api/v1/health 2>/dev/null || echo "  api: DOWN"
	@docker compose exec web wget -qO- http://localhost:3000 2>/dev/null || echo "  web: DOWN"

# ── Help ─────────────────────────────────────────────────────

help:             ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'
