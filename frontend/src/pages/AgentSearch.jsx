// src/pages/AgentSearch.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications, getUsers, getPolicies } from "../services/api.js";

export default function AgentSearch() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const apps = await getApplications();
      const usersList = await getUsers();
      const policiesList = await getPolicies();

      if (!apps || !usersList || !policiesList) {
        setError("Unable to load applications or related data.");
        return;
      }

      setApplications(apps);
      setUsers(usersList);
      setPolicies(policiesList);
    }

    load();
  }, []);

  function getUserName(userId) {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  }

  function getPolicyName(policyId) {
    const policy = policies.find((p) => p.id === policyId);
    return policy ? policy.name : "Unknown Policy";
  }

  //! Filter based on search -- later i will chnage to backend
  const filtered = applications.filter((app) => {
    if (!query) return true;

    const q = query.toLowerCase();
    const userName = getUserName(app.user_id).toLowerCase();
    const policyName = getPolicyName(app.policy_id).toLowerCase();

    return (
      String(app.id).includes(q) ||
      String(app.user_id).includes(q) ||
      String(app.policy_id).includes(q) ||
      userName.includes(q) ||
      policyName.includes(q) ||
      (app.status || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h2>Search Applications</h2>

      <input
        type="text"
        placeholder="Search by id, name, user, policy, or status"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {error && <p>{error}</p>}

      {filtered.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Applicaiton ID</th>
              <th>User ID</th>
              <th>User</th>
              <th>Policy ID</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.user_id}</td>
                <td>
                  {getUserName(app.user_id)}
                </td>
                <td>{app.policy_id}</td>
                <td>
                  {getPolicyName(app.policy_id)}
                </td>
                <td>{app.status}</td>
                <td>
                  <Link to={`/agent/applications/${app.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
