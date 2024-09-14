run:
	npm run dev

install.prisma:
	npm install prisma --save-dev

init.prisma:
	npx prisma init

DB_TYPE ?= postgres
DB_PORT ?= 5432
DB_USER ?= user
DB_PASSWORD ?= password
DB_NAME ?= mydatabase
ENV_FILE ?= .env

generate-db:
	@echo "Generating .env file with DATABASE_URL..."
	@$(call generate-db-url)

generate-db-url = \
	@if [ "$(DB_TYPE)" = "postgres" ]; then \
		DB_URL="postgres://$(DB_USER):$(DB_PASSWORD)@localhost:$(DB_PORT)/$(DB_NAME)"; \
	elif [ "$(DB_TYPE)" = "mysql" ]; then \
		DB_URL="mysql://$(DB_USER):$(DB_PASSWORD)@localhost:$(DB_PORT)/$(DB_NAME)"; \
	elif [ "$(DB_TYPE)" = "mongodb" ]; then \
		DB_URL="mongodb://$(DB_USER):$(DB_PASSWORD)@localhost:$(DB_PORT)/$(DB_NAME)"; \
	else \
		echo "Unsupported DB_TYPE: $(DB_TYPE)"; \
		exit 1; \
	fi; \
	echo "DATABASE_URL=$$DB_URL" > $(ENV_FILE); \
	echo ".env file created with DATABASE_URL=$$DB_URL"

MIGRATION_NAME ?= default_migration_name
migrate.up:
	npx prisma migrate dev --name $(MIGRATION_NAME)

install.client:
	npm install @prisma/client

install.bcrypt.ts:
	npm install @types/bcrypt --save-dev

install.bcrypt.js:
	npm install bcrypt

install.jwt.js:
	npm install jsonwebtoken

install.jwt.ts:
	npm install @types/jsonwebtoken --save-dev

install.dto:
	npm install class-validator class-transformer

generate.secret:
	@echo "Generating JWT_SECRET..."
	@$(call generate-jwt-secret)

generate-jwt-secret = \
	echo "JWT_SECRET=$$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)" > .env && \
	echo ".env file updated with JWT_SECRET"

help:
	@echo "Usage:"
	@echo "  make generate-env DB_TYPE=postgres DB_PORT=5432 DB_USER=user DB_PASSWORD=password DB_NAME=mydatabase"
	@echo "  make generate-env DB_TYPE=mysql DB_PORT=3306 DB_USER=root DB_PASSWORD=12345678 DB_NAME=mydatabase"
	@echo "  make generate-env DB_TYPE=mongodb DB_PORT=27017 DB_USER=user DB_PASSWORD=password DB_NAME=mydatabase"
	@echo "  make generate-jwt-secret"
	@echo "  make hash-password"
	@echo ""
	@echo "Default values will be used if not provided."
