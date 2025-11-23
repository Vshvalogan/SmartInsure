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
    <header className="navbar">
        <div className="navbar-left">
            <Link to={!user? "/": user.role === "user" ? "/": "/agent"}className="navbar-brand">
            <div className="navbar-logo"></div>
            <span className="navbar-title">SmartInsure</span>
            </Link>
        </div>

      <nav className="navbar-links">
        <Link to="/user/policies">Policies</Link>

        {!user && (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/agent">Agent</Link>
          </>
        )}

        {user && user.role === "user" && (
          <Link to="/user/dashboard">My Dashboard</Link>
        )}

        {user && user.role === "agent" && (
          <>
            <Link to="/agent/dashboard">Agent Dashboard</Link>
            <Link to="/agent/search">Search</Link>
          </>
        )}

        {user && (
          <>
            <span className="navbar-user">{user.name} ({user.role})</span>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
