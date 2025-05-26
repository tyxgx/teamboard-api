# **TeamBoard API** 🚀  

**A secure, role-based board and comment management system**  
✅ **Deployed on Render** (Cloud Hosting)  
✅ **Dockerized** (Containerized for easy deployment)  

🔹 **Features:**  
- ✅ **User Authentication** (Signup, Login with JWT)  
- ✅ **Role-Based Access Control (RBAC)** (Admin & Member roles)  
- ✅ **Board & Comment Management**  
- ✅ **PostgreSQL Database** (Prisma ORM)  
- ✅ **Docker Support** (Easy containerization)  
- ✅ **Render Deployment** (Live API access)  

---

## **📌 Table of Contents**  
1. [Live Deployment](#-live-deployment)  
2. [Docker Setup](#-docker-setup)  
3. [API Endpoints](#-api-endpoints)  
4. [Testing Guide](#-testing-guide-postman)  
5. [Local Development](#-local-development)  
6. [Database Schema](#-database-schema)  

---

## **🌐 Live Deployment (Render)**  
The API is **hosted on Render** for public access:  

🔗 **Base URL:** `https://teamboard-api.onrender.com`  

### **How to Use the Deployed API?**  
1. **Signup** → `POST /api/auth/signup`  
2. **Login** → `POST /api/auth/login` (Get JWT)  
3. **Access Protected Routes** → Include `Authorization: Bearer <token>`  

Example:  
```bash
curl -X POST https://teamboard-api.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"MEMBER"}'
```

---

## **🐳 Docker Setup**  
The project is **Dockerized** for easy deployment:  

### **1. Build & Run with Docker**  
```bash
docker build -t teamboard-api .
docker run -p 5000:5000 -e DATABASE_URL=postgresql://user:pass@db:5432/teamboard -e JWT_SECRET=your_jwt_secret teamboard-api
```

### **2. Docker Compose (PostgreSQL + API)**  
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/teamboard
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=teamboard
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```
Run:  
```bash
docker-compose up
```

---

## **🔗 API Endpoints**  

### **1️⃣ Authentication**  
| **Endpoint**       | **Method** | **Description**                     |
|--------------------|-----------|------------------------------------|
| `/api/auth/signup` | `POST`    | Register a new user (Admin/Member) |
| `/api/auth/login`  | `POST`    | Login & get JWT token              |

### **2️⃣ Board Management**  
| **Endpoint**      | **Method** | **Description**                          | **Access**        |
|-------------------|-----------|-----------------------------------------|-------------------|
| `/api/boards`     | `POST`    | Create a board                          | **Admin Only**    |
| `/api/boards`     | `GET`     | List boards (Admin sees all)            | Authenticated     |
| `/api/boards/:id` | `GET`     | Get board + filtered comments           | Authenticated     |

### **3️⃣ Comment System**  
| **Endpoint**             | **Method** | **Description**                          |
|--------------------------|-----------|-----------------------------------------|
| `/api/comments`          | `POST`    | Add a comment (Admin-only visibility)   |
| `/api/comments/:boardId` | `GET`     | Get comments (filtered by visibility)   |

---

## **🔍 Testing Guide (Postman)**  

### **🔐 Authentication**  
1. **Signup**  
   ```bash
   POST https://teamboard-api.onrender.com/api/auth/signup
   Body: { "name": "Test User", "email": "test@example.com", "password": "test123", "role": "MEMBER" }
   ```
2. **Login**  
   ```bash
   POST https://teamboard-api.onrender.com/api/auth/login
   Body: { "email": "test@example.com", "password": "test123" }
   Response: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   ```

### **📋 Boards & Comments**  
3. **Create Board (Admin Only)**  
   ```bash
   POST https://teamboard-api.onrender.com/api/boards
   Headers: { "Authorization": "Bearer <token>" }
   Body: { "name": "Project Roadmap" }
   ```
4. **Add Comment**  
   ```bash
   POST https://teamboard-api.onrender.com/api/comments
   Headers: { "Authorization": "Bearer <token>" }
   Body: { "content": "Hello!", "visibility": "EVERYONE", "boardId": "board-uuid" }
   ```

---

## **💻 Local Development**  
1. **Install dependencies**  
   ```bash
   npm install
   ```
2. **Set up PostgreSQL**  
   ```bash
   npx prisma migrate dev
   ```
3. **Run the server**  
   ```bash
   npm run dev
   ```

---

## **🗃 Database Schema**  
```prisma
model User {
  id       String   @id @default(uuid())
  name     String
  email    String   @unique
  password String
  role     Role
  comments Comment[]
}

model Board {
  id       String    @id @default(uuid())
  name     String
  adminId  String
  comments Comment[]
}

model Comment {
  id           String   @id @default(uuid())
  content      String
  visibility   Visibility
  createdById  String
  boardId      String
  createdBy    User     @relation(fields: [createdById], references: [id])
  board        Board    @relation(fields: [boardId], references: [id])
}
```

---

## **📜 License**  
MIT License - Free to use and modify.  

🚀 **Happy Coding!** 🚀