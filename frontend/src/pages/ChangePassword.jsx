// src/pages/ChangePassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getAuth } from "../services/api.js";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth?.user;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    const result = await changePassword({
      currentPassword,
      newPassword,
    });

    if (!result) {
      setError("Failed to change password.");
      return;
    }

    setMessage("Password updated successfully.");

    // After a short delay, go back to the correct dashboard
    setTimeout(() => {
      if (user?.role === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }, 1000);
  };

  if (!user) {
    return (
      <div>
        <h2>Change password</h2>
        <p>You must be logged in to change your password.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Change password</h2>
      <p><strong>User:</strong> {user.name} ({user.email})</p>

      <form onSubmit={handleSubmit}>
        <label>
          Current password
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          New password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          Confirm new password
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Update password</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
