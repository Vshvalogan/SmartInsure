// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import { getMyApplications, getAuth, deleteApplication } from "../services/api.js";

export default function UserDashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth?.user;

  useEffect(() => {
    async function load() {
      const auth = getAuth();
      const user = auth?.user;
  
      if (!user) {
        setError("You must be logged in to see your applications.");
        return;
      }
  
      const data = await getMyApplications();
      if (!data) {
        setError("Unable to load applications.");
        return;
      }
  
      setApplications(data);
    }
  
    load();
  }, []);    

  if (!user) {
    return (
      <div>
        <h2>User dashboard</h2>
        <p>You must be logged in to see your applications.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}'s dashboard</h2>
      {error && <p>{error}</p>}
      {applications.length === 0 && !error && <p>No applications yet.</p>}

      {applications.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Policy</th>       
              <th>Status</th>
              <th>Submitted</th>
              <th>  </th>        
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.policy_name}</td>
                <td>{app.status}</td>
                <td>
                  {app.submitted_at
                    ? new Date(app.submitted_at).toLocaleString()
                    : "-"}
                </td>
                <td>
                  {app.status === "pending" && (
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = window.confirm(
                          "Are you sure you want to cancel this application?"
                        );
                        if (!ok) return;

                        const result = await deleteApplication(app.id);
                        if (result) {
                          setApplications((prev) =>
                            prev.filter((a) => a.id !== app.id)
                          );
                        }
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
