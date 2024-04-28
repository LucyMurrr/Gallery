# Первый Запуск сервера и приложения галереи помощью Docker Compose
    cd docker_hex
    docker compose up --build -d

# Последующий запуск
    docker compose up
    
# Тестирование сервера
    http://localhost:3001/

# Тестирование приложения
    http://localhost/

# Остановка проекта
    docker compose down