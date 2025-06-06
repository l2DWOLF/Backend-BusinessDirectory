# 🧠 IE Business Directory – Backend

## 📦 Description

This backend project powers the **IE Business Directory** — a scalable and secure RESTful API built using **Node.js**, **Express**, and **MongoDB**. It offers full CRUD functionality for users and business cards, robust authentication and authorization with JWT, and data validation via Joi. Designed to integrate seamlessly with a React-based frontend, it supports multi-database environments for flexible development and production configurations.

---

## 🚀 Features

- 🔐 **User Authentication** — Register, Login, and token-based session handling
- 🧾 **CRUD Operations** — For both Users and Business Cards
- ❤️ **Like / Unlike Cards**
- 🧪 **Input Validation** — Using Joi
- 🔑 **Role-Based Access Control**
- 🛡️ **Middleware-Driven Security** — Auth guards and ownership verification
- ⚙️ **Multi-DB Support** — Easily toggle between different database environments (e.g., campus vs. personal)
- 🪵 **File Logger** — Server-side error logging
- 🌱 **DB Seeding** — For quick development bootstrapping

---

## 🛠️ Tech Stack

### Core Stack
- **Node.js** + **Express** — Backend framework
- **MongoDB** + **Mongoose** — Database & ODM
- **JWT (jsonwebtoken)** — Secure token authentication
- **Joi** — Data validation

### Dev & Utilities
- **bcryptjs** — Password hashing
- **chalk** — Colorized terminal logs
- **dotenv** — Environment variable management
- **cors** — Cross-origin resource sharing
- **morgan** — HTTP request logger
- **nodemon** — Live development server
- **lodash** — Utility library
- **cross-env** — Environment variable scripting

---

## 🖥️ Live Demo UI

👉 [Explore the App (Frontend)](https://ie-business-directory.onrender.com/)

> 🔄 **Switch between backends:** Use the dropdown in the top-left of the Navbar to toggle API sources.  
> 🧼 **Note:** Switching backends logs the user out to maintain consistency and security.

---

## 📡 API Endpoints

### 🔐 Auth Routes

- `POST /api/users/login` – Login and receive JWT  
- `POST /api/users/` – Register a new user  

### 👤 User Routes

- `GET /api/users/` – Get all users (Admin only)  
- `GET /api/users/:id` – Get user by ID (Owner or Admin)  
- `PUT /api/users/:id` – Update user details (Owner only)  
- `PATCH /api/users/:id` – Update business status (Owner only)  
- `DELETE /api/users/:id` – Delete user (Owner or Admin)  

### 🗂️ Card Routes

- `GET /api/cards/` – Get all business cards  
- `GET /api/cards/my-cards` – Get current user's cards  
- `GET /api/cards/:id` – Get a single card  
- `POST /api/cards/` – Create a new card (Business users)  
- `PUT /api/cards/:id` – Edit a card (Owner only)  
- `PATCH /api/cards/:id` – Like/unlike card (Registered users)  
- `DELETE /api/cards/:id` – Remove card (Owner or Admin)  
