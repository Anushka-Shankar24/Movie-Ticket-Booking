import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Shows from "./pages/Shows";
import SeatSelection from "./pages/SeatSelection";
import BookingSummary from "./pages/BookingSummary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Location from "./pages/Location";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Location Selection */}
          <Route
            path="/location"
            element={<Location />}
          />

          {/* Movies */}
          <Route path="/movies" element={<Movies />} />

          {/* Movie Details */}
          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />

          {/* Shows */}
          <Route
            path="/shows/:id"
            element={<Shows />}
          />

          {/* Seat Selection */}
          <Route
            path="/seats/:id"
            element={<SeatSelection />}
          />

          {/* Booking Summary */}
          <Route
            path="/booking-summary"
            element={<BookingSummary />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* User */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/bookings"
            element={<MyBookings />}
          />

        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;