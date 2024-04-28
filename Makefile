.PHONY: help

help:
	@echo "iasocs"

install:
	cd server; npm install
	cd app; npm install

run:
	docker compose up --build -d

stop:
	docker compose down

test:
	curl http://localhost:3001/
	curl http://localhost/
