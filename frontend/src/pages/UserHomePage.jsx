import { Link } from "react-router-dom";

export default function UserHomePage() {
  return (
    <div>
      <h1>Company Name</h1>
      <Link to="/policies">View Policies</Link>
      <br />
      <Link to="/agent">Agent Login</Link>
    </div>
  );
}
