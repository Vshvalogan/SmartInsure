// src/pages/AgentSearch.jsx
import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { getApplications } from "../services/api.js";

export default function AgentSearch() {
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("id"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  useEffect(() => {
    async function load() {
      const data = await getApplications("", sortBy);
      if (!data) {
        setError("Unable to load applications.");
        return;
      }
      setApplications(data);
    }
    load();
  }, [sortBy]); 

  const handleSearch = async () => {
    setError("");
    const data = await getApplications(query, sortBy);
    if (!data) {
      setError("Unable to load applications.");
      return;
    }
    setApplications(data);
  };
  function handleOpen(id) {
    navigate(`/agent/applications/${id}`)
  }
  return (
    <div>
      <h2>Search applications</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by id, user name, policy name, or status"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="button" onClick={handleSearch} style={{ marginLeft: "8px" }}>
          Search
        </button>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Sort by:{" "}
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="id">ID</option>
            <option value="user">User name</option>
            <option value="policy">Policy name</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length === 0 && !error && <p>No applications found.</p>}

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

      {/* USER column */}
      <td>
        {app.user_name
          ? `${app.user_name}`
          : `(#${app.user_id})`}
      </td>

      <td>
        {app.policy_name
          ? `${app.policy_name}`
          : `(#${app.policy_id})`}
      </td>

      <td>{app.status}</td>
      <td>
        <button onClick={() => handleOpen(app.id)}>Details</button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
