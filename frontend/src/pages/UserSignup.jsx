// src/pages/UserSignup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api.js";

export default function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a correct email ID");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: "user",
    };

    const result = await signup(userData);

    if (!result) {
      setError("Signup failed.");
      return;
    }

    setMessage("Signup successful. You can now login.");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Sign up</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
