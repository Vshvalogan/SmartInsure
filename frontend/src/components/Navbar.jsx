import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/">Company Name</Link>
      <div>
        <Link to="/policies">Policies</Link>
        <Link to="/login">User Login</Link>
        <Link to="/agent">Agent Portal</Link>
      </div>
    </nav>
  );
}
