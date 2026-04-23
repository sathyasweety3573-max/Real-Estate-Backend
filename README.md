# 🏠 Real Estate Backend API

A powerful backend API for a Real Estate Web Application built using **Node.js, Express.js, MongoDB, JWT Authentication, and Cloudinary**.

---

# 🚀 Features

* User Authentication (Register/Login)
* JWT Authentication
* Role-Based Authorization
* Admin Property Management
* Agent Property Management
* Property Search & Filters
* Favorite Properties
* Cloudinary Multiple Image Upload
* Secure Protected Routes

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cloudinary
* Multer

---

# 📁 Folder Structure

```bash
backend/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│   ├── authController.js
│   └── propertyController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── upload.js
│
├── models/
│   ├── User.js
│   └── Property.js
│
├── routes/
│   ├── authRoutes.js
│   └── propertyRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/real-estate-backend.git
```

---

## Move to backend folder

```bash
cd backend
```

---

## Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=RealEstate

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run Server

## Development Mode

```bash
npm run server
```

## Normal Start

```bash
npm start
```

---

# 🔑 Authentication Flow

```text
User Login
    ↓
JWT Token Generated
    ↓
Token Sent in Headers
    ↓
Protected Route Access
```

---

# 🔒 Authorization Header

```text
Authorization: Bearer YOUR_TOKEN
```

---

# 📦 API ENDPOINTS

---

# 🔐 AUTH ROUTES

## Register User

### POST

```http
/api/auth/register
```

### Request Body

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Login User

### POST

```http
/api/auth/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 🏠 PROPERTY ROUTES

## Add Property (Admin Only)

### POST

```http
/api/properties
```

### Authorization

```text
Bearer Token Required
```

### Request Body

```json
{
  "title": "Luxury Villa",
  "price": 1500000,
  "location": "Chennai",
  "rooms": 4,
  "images": [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
  ]
}
```

---

## Get All Properties

### GET

```http
/api/properties
```

---

## Get Single Property

### GET

```http
/api/properties/:id
```

---

## Update Property

### PUT

```http
/api/properties/:id
```

---

## Delete Property

### DELETE

```http
/api/properties/:id
```

---

## Search Properties

### GET

```http
/api/properties/search?location=Chennai&rooms=4
```

---

# ☁️ Cloudinary Setup

## Install Packages

```bash
npm install cloudinary multer multer-storage-cloudinary
```

---

## Cloudinary Config

---

# 🧪 Postman Testing

---

# Step 1 — Login

### POST

```http
http://localhost:5000/api/auth/login
```

### Body → raw → JSON

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

---

# Step 2 — Copy Token

```json
{
  "token": "JWT_TOKEN"
}
```

---

# Step 3 — Add Property

### POST

```http
http://localhost:5000/api/properties
```

---

## Authorization

```text
Type → Bearer Token
```

Paste JWT token.

---

## Body → raw → JSON

```json
{
  "title": "Luxury Villa",
  "price": 1500000,
  "location": "Chennai",
  "rooms": 4,
  "images": [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
  ]
}
```

---

# 👨‍💻 Author

Developed by Sathya 🚀
