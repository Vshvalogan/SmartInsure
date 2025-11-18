import { Link } from "react-router-dom";

export default function AgentDashboard() {
  return (
    <div>
      <h2>Agent Dashboard</h2>

      <Link to="/agent/search">Search Customer</Link>
      <br />
      <Link to="/agent/application/123">View Application</Link>
    </div>
  );
}
