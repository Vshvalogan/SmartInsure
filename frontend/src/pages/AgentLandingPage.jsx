// src/pages/AgentLandingPage.jsx
import { Link } from "react-router-dom";

export default function AgentLandingPage() {
  return (
    <div>
      <h1>SmartInsure Agent Portal</h1>

      <p>
        The Agent Portal is designed for insurance agents who need a clear view
        of customer applications and an easy way to manage decisions. After
        logging in, you can review application details, check the customer’s
        answers and update the status in a few clicks.
      </p>

      <p>
        As an agent, you will be able to search and filter applications by
        customer, policy and status, so you can quickly find the cases that need
        your attention. Each application page lets you approve or reject the
        request and record any decision notes for future reference.
      </p>

      <h3>What you can do in the Agent Portal</h3>
      <ul>
        <li>View all customer applications in one place.</li>
        <li>Search and sort by user name, policy name or application status.</li>
        <li>Open an application to see the full set of answers.</li>
        <li>Approve or reject applications and add decision notes.</li>
      </ul>

      <p>
        To access these features, please log in with your agent account.
      </p>

      <Link to="/agent/login">Go to agent login</Link>
    </div>
  );
}

