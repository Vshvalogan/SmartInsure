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
    async function loadStaticData() {
      const usersList = await getUsers();
      const policiesList = await getPolicies();

      if (!usersList || !policiesList) {
        setError("Unable to load users or policies.");
        return;
      }

      setUsers(usersList);
      setPolicies(policiesList);
    }

    loadStaticData();
  }, []);


  useEffect(() => {
    async function loadApplications() {
      const apps = await getApplications(query);
      if (!apps) {
        setError("Unable to load applications.");
        return;
      }
      setApplications(apps);
    }

    loadApplications();
  }, [query]);

  function getUserName(userId) {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  }

  function getPolicyName(policyId) {
    const policy = policies.find((p) => p.id === policyId);
    return policy ? policy.name : "Unknown Policy";
  }

  return (
    <div>
      <h2>Search Applications</h2>

      <input
        type="text"
        placeholder="Search by id, user id, policy id, or status"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {error && <p>{error}</p>}

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>
                  {getUserName(app.user_id)} (id: {app.user_id})
                </td>
                <td>
                  {getPolicyName(app.policy_id)} (id: {app.policy_id})
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
