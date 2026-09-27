import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      // Save login information
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("login"));

      alert("Login successful! 🎉");

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ off = false }) => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {off ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c5 0 9 4 10 8-0.4 1.5-1.3 2.9-2.4 4" />
          <path d="M6.1 6.1C4.5 7.2 3.3 8.8 2 12c1 4 5 8 10 8 1.4 0 2.7-.3 3.9-.8" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  const eyeStyle = {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#aaaaaa",
    cursor: "pointer",
    zIndex: 100,
    userSelect: "none",
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🎬</div>

          <h1>Welcome Back</h1>

          <p>Login to your MovieBook account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  paddingRight: "50px",
                  boxSizing: "border-box",
                }}
              />

              <span
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                style={eyeStyle}
                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                <EyeIcon off={showPassword} />
              </span>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/login">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Don't have an account?
          <Link to="/register">
            {" "}Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;