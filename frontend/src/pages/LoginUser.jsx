// src/pages/LoginUser.jsx
import { useState } from "react";
import { useLocation, useNavigate, Link} from "react-router-dom";
import { login, saveAuth } from "../services/api.js";


export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/user/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const userData = { email, password };
    const result = await login(userData);

    if (!result) {
      setError("Login failed.");
      return;
    }

    if (!result.user || !result.token) {
      setError("Invalid response from server.");
      return;
    }

    if (result.user.role !== "user") {
      setError("This account is not a customer account.");
      return;
    }

    saveAuth({ token: result.token, user: result.user });
    navigate(redirectTo, { replace: true });
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      {error && <p>{error}</p>}
    </div>
  );
}
