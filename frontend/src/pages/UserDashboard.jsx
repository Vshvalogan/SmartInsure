// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import { getApplications, getAuth, getPolicies } from "../services/api.js";

export default function UserDashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [policies, setPolicies] = useState([]);

  const auth = getAuth();
  const user = auth?.user;

  useEffect(() => {
    async function load() {
      const apps = await getApplications();
      const policies = await getPolicies();
  
      if (!apps || !policies) {
        setError("Unable to load applications or policies.");
        return;
      }
      const app = apps.filter((a) => a.user_id === user.id);
      setApplications(app);
      setPolicies(policies);
    }
  
    if (user) load();
  }, [user]);
  
  

  if (!user) {
    return (
      <div>
        <h2>User dashboard</h2>
        <p>Not logged in.</p>
      </div>
    );
  }

  function getPolicyName(id) {
    const policy = policies.find((p) => p.id === id);
    return policy ? policy.name : "Unknown Policy";
  }
  

  return (
    <div>
      <h2>{user.name}'s dashboard</h2>
      {error && <p>{error}</p>}
      {applications.length === 0 && <p>No applications yet.</p>}
      {applications.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Policy Name</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{getPolicyName(app.policy_id)}</td>
                <td>{app.status}</td>
                <td>
                  {app.submitted_at
                    ? new Date(app.submitted_at).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
