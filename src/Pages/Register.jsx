import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import "../Styling/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const name = form.displayName.trim();
    const email = form.email.trim().toLowerCase();

    // Validate display name
    if (name.length < 2 || name.length > 80) {
      setError("Name must contain 2 to 80 characters.");
      return;
    }

    // Validate email
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Validate password
    if (form.password.length < 12) {
      setError("Password must contain at least 12 characters.");
      return;
    }

    if (new TextEncoder().encode(form.password).length > 72) {
      setError("Password cannot exceed 72 UTF-8 bytes.");
      return;
    }

    // Check matching passwords
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password: form.password,
      };

      // Safe debugging: don't log the password.
      console.log("Registering user:", {
        name: payload.name,
        email: payload.email,
      });

      await registerUser(payload);

      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      console.error("Registration failed:", {
        status: err.response?.status,
        response: err.response?.data,
      });

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>Create your account</h1>
          <p>
            Save your favorites and plan your weekly meals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <label htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <label htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={12}
            required
          />

          {error && (
            <p
              className="register-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p className="register-login">
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
