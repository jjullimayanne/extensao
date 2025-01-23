build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

migrate:
	docker exec -it extension_api_app npx sequelize-cli db:migrate

migrate-undo:
	docker exec -it extension_api_app npx sequelize-cli db:migrate:undo:all

seed:
	docker exec -it extension_api_app npx sequelize-cli db:seed:all

seed-undo:
	docker exec -it extension_api_app npx sequelize-cli db:seed:undo:all
