# Sreeja Myadari — Full-Stack Software Engineer Portfolio

A full-stack portfolio built with **React 19, HTML5, bespoke CSS3**, **Java 21, Spring Boot 3.4, Spring Data JPA / Hibernate**, and **H2 / MySQL**.

## Project Structure

- `backend/` — Java 21 + Spring Boot REST API (`PortfolioController`, `AdminController`, JPA entities, `DataSeeder`, JUnit 5 + MockMvc tests).
- `frontend/` — React + Vite + CSS3 responsive UI with Obsidian Dark & Warm Alabaster Light themes, Mandala SVG geometry, live Spring Boot API Inspector, filterable project showcase, database-backed guestbook, contact form, and passkey-protected Owner Console.

## Running Locally

### 1. Start the Java Spring Boot Backend (`http://localhost:8080`)

Default mode (zero-setup persistent file-based H2 database stored at `./data/portfoliodb`):
```bash
cd backend
mvn spring-boot:run
```

Optional **MySQL** mode:
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```
*(Configure `MYSQL_URL`, `MYSQL_USERNAME`, and `MYSQL_PASSWORD` env vars or edit `backend/src/main/resources/application-mysql.properties`.)*

### 2. Start the React Frontend (`http://localhost:5173`)

```bash
cd frontend
npm install
npm run dev
```

Vite automatically proxies `/api/*` requests to `http://localhost:8080`.

### 3. Owner Console (Inbox & Project Manager)
Click **Owner Console** in the footer and enter the configured `portfolio.admin.key` (default: `sreeja-admin-2026`, override via `PORTFOLIO_ADMIN_KEY` environment variable).
