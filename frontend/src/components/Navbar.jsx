import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    alert("Logout successful! 👋");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🎬 MovieBook
        </Link>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/movies">Movies</Link>

          <Link to="/bookings">My Bookings</Link>

          <Link to="/profile">Profile</Link>

          {isLoggedIn ? (
            <button
  type="button"
  className="logout-btn"
  onClick={handleLogout}
  style={{
    width: "90px",
    height: "40px",
    padding: "0",
    margin: "0",
    background: "transparent",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "1px solid #b51f36",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "inherit",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    appearance: "none",
    WebkitAppearance: "none",
  }}
>
  Logout
</button>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;