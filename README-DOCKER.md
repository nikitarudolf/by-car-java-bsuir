# Docker Setup для By-Car Service

## Быстрый старт

### 1. Создать файл `.env` из примера
```bash
cp .env.example .env
```

### 2. Запустить все сервисы
```bash
docker-compose up -d
```

### 3. Проверить статус
```bash
docker-compose ps
```

### 4. Посмотреть логи
```bash
# Все сервисы
docker-compose logs -f

# Только приложение
docker-compose logs -f app

# Только база данных
docker-compose logs -f postgres
```

## Доступ к сервисам

- **API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **PostgreSQL**: localhost:5432

## Управление

### Остановить сервисы
```bash
docker-compose down
```

### Остановить и удалить volumes (очистить БД)
```bash
docker-compose down -v
```

### Пересобрать приложение
```bash
docker-compose up -d --build app
```

### Перезапустить только приложение
```bash
docker-compose restart app
```

## Переменные окружения

Все переменные настраиваются в файле `.env`:

| Переменная | Описание | Значение по умолчанию |
|------------|----------|----------------------|
| `DB_USERNAME` | Имя пользователя БД | `admin` |
| `DB_PASSWORD` | Пароль БД | `admin` |
| `DB_NAME` | Имя базы данных | `bycar_db` |
| `DB_PORT` | Порт PostgreSQL | `5432` |
| `APP_PORT` | Порт приложения | `8080` |
| `DDL_AUTO` | Hibernate DDL режим | `update` |
| `SHOW_SQL` | Показывать SQL запросы | `true` |

## Production настройки

Для продакшена создайте `.env` с безопасными значениями:

```bash
DB_USERNAME=bycar_prod_user
DB_PASSWORD=<сильный_пароль>
DB_NAME=bycar_prod_db
DDL_AUTO=validate
SHOW_SQL=false
```

## Troubleshooting

### Приложение не может подключиться к БД
```bash
# Проверить, что PostgreSQL запущен
docker-compose ps postgres

# Проверить логи БД
docker-compose logs postgres
```

### Пересоздать всё с нуля
```bash
docker-compose down -v
docker-compose up -d --build
```

### Подключиться к БД напрямую
```bash
docker exec -it bycar_postgres psql -U admin -d bycar_db
```

### Зайти внутрь контейнера приложения
```bash
docker exec -it bycar_app sh
```