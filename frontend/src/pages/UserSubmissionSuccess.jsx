// src/pages/UserSubmissionSuccess.jsx
import { Link } from "react-router-dom";

export default function UserSubmissionSuccess() {
  return (
    <div>
      <h2>Application submitted</h2>
      <p>Your application has been submitted for review.</p>
      <ul>
        <li>
          <Link to="/user/dashboard">Go to my dashboard</Link>
        </li>
        <li>
          <Link to="/user/policies">View more policies</Link>
        </li>
      </ul>
    </div>
  );
}
