// src/pages/UserPolicyList.jsx
import { useEffect, useState } from "react";
import { getPolicies } from "../services/api.js";
import PolicyCard from "../components/PolicyCard.jsx";

export default function UserPolicyList() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getPolicies();
      if (!data) {
        setError("Unable to load policies.");
        return;
      }
      setPolicies(data);
    }
    load();
  }, []);

  if (error) {
    return (
      <div>
        <h2>Policies</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Policies</h2>
      {policies.length === 0 && <p>No policies found.</p>}
      <div className="policy-grid">
      {policies.map((policy) => (
        <PolicyCard
          key={policy.id}
          policy={policy}
          to={`/user/policies/${policy.id}`}
        />
      ))}
      </div>
    </div>
  );
}
