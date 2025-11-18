import { Link } from "react-router-dom";

export default function AgentLandingPage() {
  return (
    <div>
      <h1>Agent Portal</h1>
      <Link to="/agent/login">Agent Login</Link>
    </div>
  );
}
