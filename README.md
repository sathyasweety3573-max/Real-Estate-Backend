# 🏡 Real Estate Backend API

A powerful and secure backend API for a Real Estate Web Application built using **Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, and Role-Based Authorization**.

This project supports:

- User Authentication
- Admin Dashboard
- Property Management
- Booking System
- Favorites
- Contact API
- Cloudinary Image Upload
- Protected Routes
- Role-Based Access

---

# 🚀 Features

✅ User Register & Login  
✅ JWT Authentication  
✅ Role-Based Authorization  
✅ Admin & User Demo Credentials  
✅ Property CRUD Operations  
✅ Add Property (Admin Only)  
✅ Booking System  
✅ Favorite Properties  
✅ My Bookings  
✅ Contact Form API  
✅ Cloudinary Multiple Image Upload  
✅ Protected Routes  
✅ Secure Password Hashing  
✅ Health Check API  
✅ MongoDB Database Integration

---

# 🧪 Demo Credentials

## 👨‍💼 Admin Login

```txt
Email: admin@demo.com
Password: admin123
```

### Admin Features

- Access Admin Dashboard
- Add New Properties
- Manage Property Listings
- View Booking Requests
- Approve or Reject Bookings
- Upload Property Images

---

## 👤 User Login

```txt
Email: user@demo.com
Password: user123
```

### User Features

- Browse Properties
- View Property Details
- Book Properties
- Add Favorite Properties
- View My Bookings
- Contact Admin

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cloudinary
- Multer
- dotenv
- CORS

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
│   ├── propertyController.js
│   ├── adminController.js
│   ├── bookingController.js
│   └── contactController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── upload.js
│
├── models/
│   ├── User.js
│   ├── Property.js
│   ├── Booking.js
│   └── Contact.js
│
├── routes/
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   ├── adminRoutes.js
│   ├── uploadRoutes.js
│   ├── bookingRoutes.js
│   └── contactRoutes.js
│
├── utils/
│   └── seedDemoUsers.js
│
├── .env
├── server.js
└── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/real-estate-backend.git
```

---

## 2️⃣ Move to Backend Folder

```bash
cd real-estate-backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run Server

## Development Mode

```bash
npm run dev
```

OR

```bash
npm run server
```

---

## Production Mode

```bash
npm start
```

---

# ✅ Health Check API

## Root Route

### GET

```http
/
```

### Response

```json
{
  "success": true,
  "message": "Real Estate API Running Successfully 🚀"
}
```

---

## Health Route

### GET

```http
/api/health
```

### Response

```json
{
  "success": true,
  "message": "Server is healthy ✅"
}
```

---

# 🔑 Authentication Flow

```txt
User Login
    ↓
JWT Token Generated
    ↓
Token Stored in Frontend
    ↓
Authorization Header Sent
    ↓
Protected Route Access
```

---

# 🔒 Authorization Header

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# 📦 API Endpoints

---

# 🔐 AUTH ROUTES

---

## Register User

### POST

```http
/api/auth/register
```

### Request Body

```json
{
  "name": "Sathya",
  "email": "sathya@gmail.com",
  "password": "123456"
}
```

---

## Login User

### POST

```http
/api/auth/login
```

---

## Demo Admin Login Body

```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

---

## Demo User Login Body

```json
{
  "email": "user@demo.com",
  "password": "user123"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "USER_ID",
    "name": "Demo Admin",
    "email": "admin@demo.com",
    "role": "admin"
  }
}
```

---

# 🏠 PROPERTY ROUTES

---

## Add Property (Admin Only)

### POST

```http
/api/property
```

### Authorization

```txt
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
/api/property
```

---

## Get Single Property

### GET

```http
/api/property/:id
```

---

## Update Property (Admin Only)

### PUT

```http
/api/property/:id
```

---

## Delete Property (Admin Only)

### DELETE

```http
/api/property/:id
```

---

# 📅 BOOKING ROUTES

---

## Create Booking

### POST

```http
/api/booking
```

### Authorization

```txt
Bearer Token Required
```

### Request Body

```json
{
  "property": "PROPERTY_ID",
  "name": "Demo User",
  "email": "user@demo.com",
  "phone": "9876543210",
  "message": "I want to book this property"
}
```

---

## Get My Bookings

### GET

```http
/api/booking/my-bookings
```

### Authorization

```txt
Bearer Token Required
```

---

# 👨‍💼 ADMIN ROUTES

---

## Get All Booking Requests

### GET

```http
/api/admin/bookings
```

### Authorization

```txt
Admin Bearer Token Required
```

---

## Update Booking Status

### PATCH

```http
/api/admin/bookings/:id
```

### Authorization

```txt
Admin Bearer Token Required
```

### Request Body

```json
{
  "status": "confirmed"
}
```

---

# 📩 CONTACT ROUTES

---

## Send Contact Message

### POST

```http
/api/contact
```

### Request Body

```json
{
  "name": "Sathya",
  "email": "sathya@gmail.com",
  "message": "I want to know more about properties"
}
```

---

# ☁️ CLOUDINARY IMAGE UPLOAD

---

## Upload Property Image

### POST

```http
/api/upload
```

### Authorization

```txt
Admin Bearer Token Required
```

### Form Data

```txt
image: selected_file
```

---

# 🧪 POSTMAN TESTING

---

# Step 1 — Admin Login

### POST

```http
http://localhost:5000/api/auth/login
```

### Body → raw → JSON

```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

---

# Step 2 — Copy JWT Token

```json
{
  "token": "JWT_TOKEN"
}
```

---

# Step 3 — Add Property

### POST

```http
http://localhost:5000/api/property
```

### Authorization

```txt
Type → Bearer Token
```

Paste JWT token.

---

### Body → raw → JSON

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

# Step 4 — User Login

### POST

```http
http://localhost:5000/api/auth/login
```

### Body

```json
{
  "email": "user@demo.com",
  "password": "user123"
}
```

---

# Step 5 — Create Booking

### POST

```http
http://localhost:5000/api/booking
```

### Authorization

```txt
Type → Bearer Token
```

Paste User JWT token.

### Body

```json
{
  "property": "PROPERTY_ID",
  "name": "Demo User",
  "email": "user@demo.com",
  "phone": "9876543210",
  "message": "I want to book this property"
}
```

---

# 🔗 Deployment

## Backend Deployment

Deployed using Render.

Example:

```txt
https://your-backend-url.onrender.com
```

---

## Frontend Deployment

Deployed using Netlify.

Example:

```txt
https://your-frontend-url.netlify.app
```

---

# ✅ Mentor Review Notes

This project includes:

✅ Demo Admin Credentials  
✅ Demo User Credentials  
✅ Admin Dashboard  
✅ Protected Admin Routes  
✅ Role-Based Authentication  
✅ Booking Management  
✅ Property Management  
✅ Favorites & My Bookings  
✅ Secure JWT Authentication  
✅ Cloudinary Image Upload  

---

# 👨‍💻 Author

Developed with ❤️ by Sathya 🚀
