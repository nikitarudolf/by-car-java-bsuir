# Bycar (AV.BY Clone)

Bycar — это RESTful API сервис для размещения и управления объявлениями о продаже автомобилей. Проект реализует полноценную серверную логику маркетплейса с учетом сложных связей между техническими характеристиками авто, пользователями и справочными данными.

## Технологический стек:
* **Java 17+**
* **Spring Boot 3.x** (Web, Data JPA, Validation)
* **Maven** (Сборка и управление зависимостями)
* **PostgreSQL** (Реляционная база данных)
* **Hibernate** (ORM для работы с БД)
* **Docker / Docker Compose** (Контейнеризация БД)
* **GitHub Actions** (CI/CD пайплайны)
* **SonarCloud** (Статический анализ качества кода)

## Как запустить:
1. Клонировать репозиторий:
   ```bash
   git clone [https://github.com/your-username/by-car-java-bsuir.git](https://github.com/your-username/by-car-java-bsuir.git)
2. Запустить приложение
   ```bash
   ./mvnw spring-boot:run
