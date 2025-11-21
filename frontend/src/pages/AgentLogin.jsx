// src/pages/AgentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveAuth } from "../services/api.js";

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (!result) {
      setError("Login failed.");
      return;
    }

    if (!result.user || !result.token) {
      setError("Invalid response from server.");
      return;
    }

    if (result.user.role !== "agent") {
      setError("This account is not an agent account.");
      return;
    }

    saveAuth({ token: result.token, user: result.user });
    navigate("/agent/dashboard");
  };

  return (
    <div>
      <h2>Agent login</h2>
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
      {error && <p>{error}</p>}
    </div>
  );
}
