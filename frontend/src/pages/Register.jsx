import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      Read values directly from the form.
      This also handles browser autofill correctly.
    */
    const form = e.currentTarget;

    const name =
      form.elements["name"]?.value.trim() || "";

    const email =
      form.elements["email"]?.value.trim() || "";

    const password =
      form.elements["password"]?.value || "";

    const confirmPassword =
      form.elements["confirmPassword"]?.value || "";

    // =========================
    // VALIDATION
    // =========================

    if (!name) {
      alert("Please enter your full name.");
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (!confirmPassword) {
      alert("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      alert(
        response.data.message ||
          "Registration successful! 🎉"
      );

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EYE ICON
  ========================= */

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

          <circle
            cx="12"
            cy="12"
            r="3"
          />
        </>
      )}
    </svg>
  );

  /* =========================
     EYE STYLE
  ========================= */

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

        {/* =========================
            HEADER
        ========================= */}

        <div className="auth-header">
          <div className="auth-icon">
            🎬
          </div>

          <h1>Create Account</h1>

          <p>
            Register to start booking your favorite movies
          </p>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          autoComplete="on"
        >

          {/* FULL NAME */}

          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          {/* EMAIL */}

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
              autoComplete="email"
            />
          </div>

          {/* PASSWORD */}

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                style={{
                  width: "100%",
                  paddingRight: "50px",
                  boxSizing: "border-box",
                }}
              />

              <span
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                style={eyeStyle}
                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                <EyeIcon
                  off={showPassword}
                />
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                autoComplete="new-password"
                style={{
                  width: "100%",
                  paddingRight: "50px",
                  boxSizing: "border-box",
                }}
              />

              <span
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) =>
                      !previous
                  )
                }
                style={eyeStyle}
                title={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                <EyeIcon
                  off={
                    showConfirmPassword
                  }
                />
              </span>
            </div>
          </div>

          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* =========================
            DIVIDER
        ========================= */}

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* =========================
            LOGIN
        ========================= */}

        <p className="auth-switch">
          Already have an account?
          <Link to="/login">
            {" "}Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;