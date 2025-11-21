// src/pages/AgentDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications, getUsers, getPolicies } from "../services/api.js";

export default function AgentDashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);


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

  function getUserName(id) {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "Unknown User";
  }
  
  function getPolicyName(id) {
    const policy = policies.find((p) => p.id === id);
    return policy ? policy.name : "Unknown Policy";
  }
  
  
  return (
    <div>
      <h2>Agent dashboard</h2>
      {error && <p>{error}</p>}
      {applications.length === 0 && <p>No applications yet.</p>}
      {applications.length > 0 && (
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
                <td>{getUserName(app.user_id)}</td>
                <td>{getPolicyName(app.policy_id)}</td>
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
