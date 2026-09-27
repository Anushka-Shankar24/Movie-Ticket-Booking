# 🎬 Movie Ticket Booking App

A full-stack **Movie Ticket Booking Web Application** built using the **MERN Stack**.

The application allows users to browse movies, select their location, choose theatres and show timings, select seats, confirm bookings, and view their booking history through a digital ticket interface.

---

## 🚀 Live Project

🔗 GitHub Repository:  
https://github.com/Anushka-Shankar24/Movie-Ticket-Booking

---

## 📌 Features

### 🎥 Movie Features
- Browse available movies
- Movie search functionality
- Genre-based filtering
- Movie details page
- Movie posters and descriptions
- Movie trailers
- Rating, language and duration information

### 📍 Location Selection
- State selection
- City selection
- Cinema/theatre selection
- Location-based movie booking flow

### 🎭 Theatre & Shows
- Multiple theatres
- Multiple screens
- Show timings
- Date-wise show selection
- Theatre-wise show listing

### 💺 Seat Selection
- Cinema-style seat layout
- Different seat categories
- Normal seats
- Executive seats
- Premium seats
- Recliner seats
- Select and deselect seats
- Seat price calculation

### 🎟️ Booking System
- Secure user authentication
- Movie booking
- Theatre selection
- Show date and time
- Seat selection
- Ticket price calculation
- Total booking amount
- Booking confirmation
- Booking ID generation
- Booking history
- Digital ticket modal

### 👤 User Features
- User registration
- User login
- JWT authentication
- User profile
- Booking statistics
- My Bookings section
- Logout functionality

### 🔐 Security
- Password hashing using bcrypt
- JWT-based authentication
- Protected backend routes
- User-specific booking history
- Environment variables for sensitive configuration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Development Tools
- VS Code
- Git
- GitHub
- Postman
- MongoDB Atlas
- Nodemon
- Vite

---

## 🏗️ Project Architecture

```text
Movie-Ticket-Booking/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── data/
│   │   ├── locations.js
│   │   └── movieSeed.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Movie.js
│   │   ├── Show.js
│   │   ├── Theatre.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── locationRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── showRoutes.js
│   │   └── theatreRoutes.js
│   │
│   ├── seedMovies.js
│   ├── seedShows.js
│   ├── seedTheatres.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── posters/
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── data/
│   │   │   └── movies.js
│   │   │
│   │   ├── pages/
│   │   │   ├── BookingSummary.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Location.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   ├── Movies.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SeatSelection.jsx
│   │   │   ├── Shows.jsx
│   │   │   └── TicketModal.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

🔄 Application Flow
Location Selection
        ↓
Browse Movies
        ↓
Movie Details
        ↓
Select Trailer
        ↓
Select Theatre
        ↓
Select Date & Show Time
        ↓
Select Seats
        ↓
Booking Summary
        ↓
Login / Register
        ↓
Confirm Booking
        ↓
My Bookings
        ↓
Digital Ticket



⚙️ Run Locally
Backend
cd backend
npm install
npm run dev

frontend
cd frontend
npm install
npm run dev

👩‍💻 Author

Anushka Shankar

GitHub:
https://github.com/Anushka-Shankar24
LinkedIn:
https://www.linkedin.com/in/anushka-shankar-095a63334?utm_source=share_via&utm_content=profile&utm_medium=member_android
