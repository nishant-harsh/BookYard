# BookYard

BookYard is a modern library management system designed to streamline the process of book reservations, user management, and book administration. It offers a user-friendly interface for both administrators and users to manage books and reservations efficiently.


## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

Follow these steps to get your development environment running:

1. _Clone the Repository_

   ```bash

    git clone https://github.com/nishant-harsh/bookyard.git
    cd BookYard

   ```

2. _Backend Setup_

   Navigate to the server directory and install dependencies.

   ```bash
    cd server
    npm install
   ```

   Start the backend server.

   ```bash
    npm start
   ```

   The server should now be running on `http://localhost:3000`.

3. _Frontend Setup_

   Open a new terminal, navigate to the client directory from the root of the project, and install dependencies.

   ```bash
    cd client
    npm install
   ```

   Start the frontend application.

   ```bash
    npm run dev
   ```

   The application should now be running on `http://localhost:5173`.

### Configuration

- Configure your database connection and other environment variables by creating a .env file in the server directory.
- Update the .env file with your MongoDB URI and other necessary configurations.
- Example :
  - Backend
  ```.env
    PORT=3000
    NODE_ENV="devlopment"
    FRONTEND_BASE_URL="http://localhost:5173"
    MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mnap9ok.mongodb.net/lms?retryWrites=true&w=majority"
    JWT_SECRET="<random_string>"
    JWT_REFRESH_SECRET="<another_different_random_string>"```
  ```
  - Frontend
  ```.env
    VITE_BASE_URL="http://localhost:3000"
  ```

## Features

- User Authentication and Authorization
- Book Management
- Reservation System
- User Management for Admin
- Responsive Design for various devices


<!-- API DOCUMENTATION -->

# BookYard API Documentation

## Authentication API

### User Registration

- **Endpoint:** `POST auth/register`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: User object

**NOTE:** `By default every user has role set to "Member". To create your very first admin, you need to manually change the role to "Admin" in the database to use admin related routes and functionalities.`

### User Login

- **Endpoint:** `POST auth/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: Login Message

### Get User

- **Endpoint:** `GET auth/user`
- **Authentication:** Required
- **Response:**
  - Status Code: 200 OK
  - Body: User object

### Refresh Access Token

- **Endpoint:** `GET auth/refresh_token`
- **Response:**
  - Status Code: 200 OK
  - Body: New access token

### Logout

- **Endpoint:** `DELETE auth/logout`
- **Authentication:** Required
- **Response:**
  - Status Code: 200 OK

## Book API

### Get All Books

- **Endpoint:** `GET book/books`
- **Response:**
  - Status Code: 200 OK
  - Body: Array of book objects

### Get Book by ID

- **Endpoint:** `GET book/:id`
- **Request Parameters:**
  - `id`: MongoDB ID of the book
- **Response:**
  - Status Code: 200 OK
  - Body: Book object

### Add a New Book

- **Endpoint:** `POST book/add`
- **Authentication:** Admin role required
- **Request Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "pubYear": "integer",
    "availability": "boolean",
    "genre": "string",
    "bookImage": "URL"
  }
  ```
- **Response:**
  - Status Code: 201 Created
  - Body: Newly added book object

### Update a Book

- **Endpoint:** `PUT book/:id`
- **Authentication:** Admin role required
- **Request Parameters:**
  - `id`: MongoDB ID of the book
- **Request Body:** Same as "Add a New Book"
- **Response:**
  - Status Code: 200 OK
  - Body: Updated book object

### Update Book Availability

- **Endpoint:** `PATCH book/:id/availability`
- **Authentication:** Required
- **Request Parameters:**
  - `id`: MongoDB ID of the book
- **Request Body:**
  ```json
  {
    "availability": "boolean"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: Updated book object

### Delete Book

- **Endpoint:** `DELETE book/:id`
- **Authentication:** Admin role required
- **Request Parameters:**
  - `id`: MongoDB ID of the book
- **Response:**
  - Status Code: 200 OK

## User API

### Get All Users

- **Endpoint:** `GET user/users`
- **Authentication:** Admin role required
- **Response:**
  - Status Code: 200 OK
  - Body: Array of user objects

### Get User Reservations

- **Endpoint:** `GET user/reservations`
- **Authentication:** Required
- **Response:**
  - Status Code: 200 OK
  - Body: Array of reservation objects

### Update User Role

- **Endpoint:** `PUT user/users/:id`
- **Authentication:** Admin role required
- **Request Parameters:**
  - `id`: MongoDB ID of the user
- **Request Body:**
  ```json
  {
    "role": "Member | Admin"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: Updated user object

### Reserve Book

- **Endpoint:** `POST user/reserve/:bookId`
- **Authentication:** Required
- **Request Parameters:**
  - `bookId`: MongoDB ID of the book
- **Response:**
  - Status Code: 201 Created
  - Body: Reservation object

### Update Reservation Status

- **Endpoint:** `PATCH user/reservations/:id`
- **Authentication:** Admin role required
- **Request Parameters:**
  - `id`: MongoDB ID of the reservation
- **Request Body:**
  ```json
  {
    "status": "Approved | Rejected"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: Updated reservation object

### Delete User

- **Endpoint:** `DELETE user/users/:id`
- **Authentication:** Admin role required
- **Request Parameters:**
  - `id`: MongoDB ID of the user
- **Response:**
  - Status Code: 200 OK

### Delete Reservation Request

- **Endpoint:** `DELETE user/reservation/:RId`
- **Authentication:** Required
- **Request Parameters:**
  - `RId`: MongoDB ID of the reservation
- **Response:**
  - Status Code: 200 OK
