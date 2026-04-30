# ByCar - Платформа продажи автомобилей

Полнофункциональная платформа для размещения и поиска объявлений о продаже автомобилей (клон AV.by).

## Архитектура

- **Backend**: Spring Boot 3.4.1 + PostgreSQL 16
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Deployment**: Docker + Docker Compose


### Требования

- Docker Desktop
- Docker Compose

### Запуск всего стека

```bash
docker-compose up --build
```

Это запустит:
- PostgreSQL на порту 5432
- Backend API на порту 8080
- Frontend на порту 80

### Доступ к приложению

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html

### Остановка

```bash
docker-compose down
```

### Полная очистка (включая данные БД)

```bash
docker-compose down -v
```

## Структура проекта

```
.
├── src/                          # Backend (Spring Boot)
│   ├── main/
│   │   ├── java/
│   │   │   └── by/bycar/carservice/
│   │   │       ├── controller/   # REST контроллеры
│   │   │       ├── service/      # Бизнес-логика
│   │   │       ├── repository/   # JPA репозитории
│   │   │       ├── model/        # Entity модели
│   │   │       └── dto/          # DTO объекты
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql          # Начальные данные
│   └── test/
├── car-service-client/           # Frontend (React)
│   ├── src/
│   │   ├── api/                  # API клиенты
│   │   ├── components/           # React компоненты
│   │   ├── pages/                # Страницы
│   │   ├── store/                # Zustand stores
│   │   └── types/                # TypeScript типы
│   ├── Dockerfile
│   └── nginx.conf
├── Dockerfile.backend
└── docker-compose.yml
```

## Функционал

### Backend

✅ CRUD операции для всех сущностей
✅ Фильтрация и поиск объявлений
✅ Асинхронная модерация
✅ Система избранного (ManyToMany)
✅ Опции автомобилей (ManyToMany)
✅ Счетчики просмотров
✅ Управление фотографиями
✅ Swagger документация

### Frontend

✅ Главная страница с последними объявлениями
✅ Каталог с расширенными фильтрами:
  - Каскадный выбор бренда и модели
  - Диапазоны цены и года
  - Тип двигателя, коробки, привода
  - Город и регион
✅ Детальная страница объявления
✅ Система избранного
✅ Темная/светлая тема
✅ Адаптивный дизайн
✅ Skeleton loaders

## Связи данных

### OneToMany
- Brand → Models (один бренд - много моделей)
- Model → Cars (одна модель - много автомобилей)
- User → Advertisements (один пользователь - много объявлений)
- Advertisement → Photos (одно объявление - много фото)

### ManyToMany
- Car ↔ Features (автомобиль имеет много опций)
- User ↔ Advertisements через Favorites (избранное)

## Тестовые данные

При первом запуске база автоматически заполняется:
- 20 брендов (Toyota, BMW, Mercedes, Audi, VW, Ford и др.)
- 200 моделей (по 10 для каждого бренда)
- 47 опций в 5 категориях (SAFETY, COMFORT, MULTIMEDIA, EXTERIOR, PERFORMANCE)
- 10 пользователей (включая 3 автосалона)
- 10 тестовых объявлений с полными характеристиками

## API Endpoints

### Объявления
- `GET /api/advertisements` - список с фильтрами
- `GET /api/advertisements/{id}` - детали
- `POST /api/advertisements` - создать
- `PUT /api/advertisements/{id}` - обновить
- `DELETE /api/advertisements/{id}` - удалить

### Бренды и модели
- `GET /api/brands` - список брендов
- `GET /api/models?brandId={id}` - модели бренда

### Опции
- `GET /api/features` - список опций

### Избранное
- `GET /api/favorites/user/{userId}` - избранное пользователя
- `POST /api/favorites?userId={id}&advertisementId={id}` - добавить
- `DELETE /api/favorites?userId={id}&advertisementId={id}` - удалить

### Фотографии
- `GET /api/photos/advertisement/{id}` - фото объявления
- `POST /api/photos/advertisement/{id}` - загрузить
- `DELETE /api/photos/{id}` - удалить

## Разработка без Docker

### Backend

```bash
# Требования: JDK 17+, PostgreSQL 16
./mvnw spring-boot:run
```

### Frontend

```bash
cd car-service-client
npm install
npm run dev
```

## Переменные окружения

Создайте `.env` файл в корне проекта:

```env
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=bycar_db
DB_PORT=5432
APP_PORT=8080
DDL_AUTO=update
SHOW_SQL=true
```

## CI/CD (GitHub Actions + Railway)

Добавлен workflow `/.github/workflows/ci-cd.yml`, который выполняет:
- сборку и тесты (`mvn verify`);
- деплой в Railway;
- healthcheck после деплоя.

### Необходимые GitHub Secrets

В репозитории нужно создать:
- `RAILWAY_TOKEN` - Project Token из Railway;
- `RAILWAY_SERVICE` - идентификатор/имя сервиса Railway для деплоя;
- `APP_HEALTHCHECK_URL` - публичный URL healthcheck, например `https://<your-domain>/actuator/health`.

Workflow запускается автоматически при push в `main` и вручную через `workflow_dispatch`.

## Технологии

### Backend
- Spring Boot 3.4.1
- Spring Data JPA
- PostgreSQL 16
- Lombok
- Hibernate Validator
- Springdoc OpenAPI (Swagger)

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- TanStack Query (React Query)
- Zustand
- Axios
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Lucide React

## Лицензия

MIT
