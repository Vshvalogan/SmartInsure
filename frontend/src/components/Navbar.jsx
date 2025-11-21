// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../services/api.js";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth?.user;

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <Link to="/">SmartInsure</Link> |{" "}
        <Link to="/user/policies">Policies</Link>{" "}
        {!user && (
          <>
            {" | "}
            <Link to="/login">User Login</Link> |{" "}
            <Link to="/agent">Agent</Link>
          </>
        )}
        {user && user.role === "user" && (
          <>
            {" | "}
            <Link to="/user/dashboard">My Dashboard</Link>
          </>
        )}
        {user && user.role === "agent" && (
          <>
            {" | "}
            <Link to="/agent/dashboard">Agent Dashboard</Link> |{" "}
            <Link to="/agent/search">Search</Link>
          </>
        )}
        {user && (
          <>
            {" | "}
            <span>
              {user.name} ({user.role})
            </span>
            {" | "}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
