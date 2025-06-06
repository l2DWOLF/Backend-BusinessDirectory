# Backend Project

## Description

This backend project is a robust and scalable REST API built with Node.js, Express, and MongoDB. It provides a secure authentication system, user profile management, and a full suite of CRUD operations for business cards and users. Designed to integrate seamlessly with a separate frontend, it ensures efficient data handling, validation, and user authorization. With middleware for authentication and request validation, this backend serves as a reliable foundation for dynamic web applications.

## Features

- User authentication (Register/Login/Logout), Password hashing, token.
- Create, Read, Update, Delete (CRUD) operations for business cards & users.
- Like/Unlike business cards.
- Automated Database Seeding. 
- Middleware for authentication and validation.
- File error logger. 

## Technologies Used

### Dependencies

- **bcryptjs**: Password hashing.
- **chalk**: Terminal string styling.
- **config**: Configuration management.
- **cors**: Cross-Origin Resource Sharing.
- **cross-env**: Cross-platform environment variables.
- **dotenv**: Environment variable management.
- **express**: Web framework for Node.js.
- **joi**: Data validation.
- **jsonwebtoken**: JWT-based authentication.
- **lodash**: Utility functions.
- **mongoose**: MongoDB Object Modeling (ODM).
- **morgan**: HTTP request logger.
- **nodemon**: Automatic server restarts during development.

## 🖥️ Live Demo Frontend 

👉 [Explore this backend project via a Frontend UI](https://ie-business-directory.onrender.com/)
- **To connect to this backend, select "DB: IE Backend" from the navbar db selection list**

---
## Installation

1. Clone the repository:
   ```sh
   git clone l2DWOLF/Backend-BusinessDirectory
   ```
2. Navigate into the project folder:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add the required environment variables (such as database connection string, JWT secret, etc.).
5. Start the server:
   ```sh
   npm start
   ```
   For development mode with automatic restarts:
   ```sh
   npm run dev
   ```

## API Endpoints

### Auth Routes

- `POST /api/users/login` - Authenticate user and return token.
- `POST /api/users/` - Register a new user.

### User Routes

- `GET /api/users/` - Get all users. (Admin only).
- `GET /api/users/:id` - Get a user by ID. (Owner or Admin only).
- `PUT /api/users/:id` - Update user details. (Owner only).
- `PATCH /api/users/:id` - Update user business status. (Owner only).
- `DELETE /api/users/:id` - Delete a user (Owner/Admin only).

### Card Routes

- `GET /api/cards/` - Get all business cards
- `GET /api/cards/my-cards` - Get logged-in user's cards (Owner only).
- `GET /api/cards/:id` - Get a single card by ID 
- `POST /api/cards/` - Create a new card (Business users only).
- `PUT /api/cards/:id` - Update a card (Owner only).
- `PATCH /api/cards/:id` - Like/Unlike a card (Registered Users only).
- `DELETE /api/cards/:id` - Delete a card (Owner/Admin only).

## Environment Variables

Ensure you have a `.env` file with the following variables:

```
JWT_SECRET=<your_jwt_secret>
MONGO_URI=<your_mongo_connection_string>
LOCAL_API=<your_local_api>
```

## License

This project is open-source and available under the [MIT License](LICENSE).