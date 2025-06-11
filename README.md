# Blogging Platform 📝

A full-stack blogging web application built with React (frontend) and Spring Boot (backend). It supports user registration, login via JWT, profile editing with password verification, creating and deleting comments, and more.

## 🚀 Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- ✏️ Profile editing (with password confirmation)
- 📝 Create and delete comments on posts
- 📚 Category and post listings
- 💬 Toast notifications for feedback (success/error)
- 🌙 Clean UI using Tailwind CSS

---

## 📦 Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- React Hot Toast

### Backend

- Java 17
- Spring Boot
- Spring Security + JWT
- JPA/Hibernate
- MySQL (or other RDBMS)

---

## 🛠️ Project Structure

```markdown
frontend/
├── src/
│   ├── components/
│   ├── utils/
│   │   └── api.js
│   └── App.jsx

blog/
├── src/
│   ├── controllers/
│   ├── entities/
│   ├── payloads/
│   ├── repositories/
│   ├── security/
│   ├── services/
│   └── BloggingApplication.java
```


---

## 🔑 API Endpoints

### 🔐 Auth

- `POST /api/auth/register` – Register a user
- `POST /api/auth/login` – Login and get JWT
- `POST /api/auth/verify-password` – Verify password (before profile update)

### 👤 Users

- `GET /api/users/{userId}` – Get user info
- `PUT /api/users/{userId}` – Update user info (requires JWT)

### 💬 Comments

- `POST /api/users/{userId}/posts/{postId}/comments` – Add comment
- `DELETE /api/comment/{commentId}` – Delete comment

### 📚 Categories & Posts

- `GET /api/categories/` – Fetch all categories
- `GET /api/categories/{categoryId}` – Fetch single category
- `GET /api/user/{userId}/posts` – Fetch user’s posts

---

## ✅ Running the Project

### Backend

```bash
cd server
./mvnw spring-boot:run
```

### Frontend
```bash
cd client
npm install
npm run dev
```
