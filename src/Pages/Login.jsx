
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/userApi";
import "../Styling/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(form);

      sessionStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      const destination = location.state?.from;

      navigate(
        destination &&
          destination.startsWith("/") &&
          !destination.startsWith("//") &&
          destination !== "/login"
          ? destination
          : "/",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Incorrect email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>
            Log in to get to your favorites and meal plans.
          </p>
        </div>

        {message && (
          <p
            className="login-required-message"
            role="status"
          >
            {message}
          </p>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="login-register">
          New here?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
