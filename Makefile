DOCKER_COMPOSE = docker-compose
APP_CONTAINER = extension_api_app

up:
	$(DOCKER_COMPOSE) up --build -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

migrate:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npx sequelize-cli db:migrate --config src/config/config.js --migrations-path src/migrations

seed:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npx sequelize-cli db:seed:all --config src/config/config.js

reset-db:
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npx sequelize-cli db:migrate:undo:all --config src/config/config.js && \
	$(DOCKER_COMPOSE) exec $(APP_CONTAINER) npx sequelize-cli db:migrate --config src/config/config.js --migrations-path src/migrations

start:
	$(DOCKER_COMPOSE) up --build

stop:
	$(DOCKER_COMPOSE) down

clean:
	$(DOCKER_COMPOSE) down -v && rm -rf node_modules

setup: clean up migrate seed logs
