# Lab 1: CI/CD Pipeline with GitHub, Azure DevOps, and Docker Hub

## Короткий опис сервісу

Простий REST API сервіс для керування сутностями (CRUD), розроблений на Node.js та Express.

## Використана мова та фреймворк

- Мова: JavaScript (Node.js)
- Фреймворк: Express.js

## Інструкція як зібрати та запустити Docker image

1. Зібрати образ:
   ```bash
   docker build -t lab1-app .
   ```

````


2. Запустити контейнер:
```bash
docker run -p 3000:3000 lab1-app

````

## Команда запуску тестів

```bash
npm test
```

add test comment
something
ffffffffffffffffff
