# **TeamBoard API** 🚀  

A **secure**, **role-based** board and comment management system built with **Node.js, Express, Prisma, and PostgreSQL**.  

🔹 **Features:**  
- ✅ **User Authentication** (Signup, Login with JWT)  
- ✅ **Role-Based Access Control (RBAC)** (Admin & Member roles)  
- ✅ **Board Management** (Create & View Boards)  
- ✅ **Comment System** (Public & Admin-only visibility)  
- ✅ **Prisma ORM** for type-safe database operations  

---

## **📌 Table of Contents**  
1. [Tech Stack](#-tech-stack)  
2. [API Endpoints](#-api-endpoints)  
3. [Setup & Installation](#-setup--installation)  
4. [Environment Variables](#-environment-variables)  
5. [Running the Project](#-running-the-project)  
6. [Testing APIs](#-testing-apis)  
7. [License](#-license)  

---

## **🛠 Tech Stack**  
| **Category**       | **Technologies**                          |
|--------------------|------------------------------------------|
| **Backend**        | Node.js, Express.js                       |
| **Database**       | PostgreSQL (Prisma ORM)                  |
| **Authentication** | JWT (JSON Web Tokens)                    |
| **Security**       | Bcrypt (Password Hashing), RBAC          |
| **API Testing**    | Postman                                  |

---

## **🔗 API Endpoints**  

### **1. Authentication**  
| **Endpoint**       | **Method** | **Description**                     | **Access** |
|--------------------|-----------|------------------------------------|------------|
| `/api/auth/signup` | `POST`    | Register a new user (Admin/Member) | Public     |
| `/api/auth/login`  | `POST`    | Login & get JWT token              | Public     |

### **2. Board Management**  
| **Endpoint**          | **Method** | **Description**                          | **Access**        |
|-----------------------|-----------|-----------------------------------------|-------------------|
| `/api/boards`         | `POST`    | Create a new board                      | **Admin Only**    |
| `/api/boards`         | `GET`     | Get all boards (Admin sees all)         | Authenticated     |
| `/api/boards/:id`     | `GET`     | Get board details + filtered comments   | Authenticated     |

### **3. Comment System**  
| **Endpoint**              | **Method** | **Description**                          | **Access**        |
|---------------------------|-----------|-----------------------------------------|-------------------|
| `/api/comments`           | `POST`    | Add a comment (Admin-only visibility)   | Authenticated     |
| `/api/comments/:boardId`  | `GET`     | Get comments (filtered by visibility)   | Authenticated     |

---

## **⚙ Setup & Installation**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/teamboard-api.git
cd teamboard-api
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Set Up PostgreSQL**  
- Install PostgreSQL locally or use a cloud provider.  
- Update the `DATABASE_URL` in `.env` (see [Environment Variables](#-environment-variables)).  

### **4. Run Database Migrations**  
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## **🔑 Environment Variables**  
Create a `.env` file in the root directory:  
```env
DATABASE_URL="postgresql://username:password@localhost:5432/teamboard"
JWT_SECRET="your_jwt_secret_here"
```

---

## **🚀 Running the Project**  

### **Development Mode**  
```bash
npm run dev
```
- Runs on `http://localhost:5000`  

### **Production Build**  
```bash
npm run build
npm start
```

---

## **🔍 Testing APIs**  

### **1. Signup (Register a User)**  
```bash
POST /api/auth/signup
Body (JSON):
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### **2. Login (Get JWT Token)**  
```bash
POST /api/auth/login
Body (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### **3. Create a Board (Admin Only)**  
```bash
POST /api/boards
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body (JSON):
{
  "name": "Project Board"
}
```

### **4. Add a Comment**  
```bash
POST /api/comments
Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
Body (JSON):
{
  "content": "This is a test comment",
  "visibility": "EVERYONE",
  "boardId": "board-uuid"
}
```


---

## **🙌 Contribution**  
Feel free to **fork, open issues, or submit PRs**!  

🚀 **Happy Coding!** 🚀  

---

### **📌 Note**  
- **Postman Collection**: For API testing, import the Postman collection (if available).  
- **Prisma Studio**: Run `npx prisma studio` to visualize the database.  

🔗 **GitHub Repo**: [https://github.com/your-username/teamboard-api](https://github.com/your-username/teamboard-api)  

---

