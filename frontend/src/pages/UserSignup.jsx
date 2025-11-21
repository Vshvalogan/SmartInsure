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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: "user", // important: this is a customer account
    };

    const result = await signup(userData);

    if (!result) {
      setError("Signup failed.");
      return;
    }

    // your backend register returns { msg, user }
    setMessage("Signup successful. You can now login.");
    // simple: redirect to login after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
        <br />
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
        <button type="submit">Sign up</button>
      </form>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
