// src/pages/AgentLandingPage.jsx
import { Link } from "react-router-dom";

export default function AgentLandingPage() {
  return (
    <div>
      <h1>Agent Portal</h1>
      <p>Login to review and manage customer applications.</p>
      <Link to="/agent/login">Agent login</Link>
    </div>
  );
}
