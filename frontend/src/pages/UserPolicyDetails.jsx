// src/pages/UserPolicyDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPolicyById } from "../services/api.js";

export default function UserPolicyDetails() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState("");

  function formatCurrency(value) {
    if (value == null) return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    return `$${num.toFixed(2)}`;
  }
  useEffect(() => {
    async function load() {
      const data = await getPolicyById(id);
      if (!data) {
        setError("Unable to load policy.");
        return;
      }
      setPolicy(data);
    }
    load();
  }, [id]);

  if (error) {
    return (
      <div>
        <h2>Policy details</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!policy) {
    return (
      <div>
        <h2>Policy details</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{policy.name}</h2>
      <p>Type: {policy.type}</p>
      <p>Premium: {formatCurrency(policy.premium)} / month</p>
      <p>Coverage: {formatCurrency(policy.coverage_amount)}</p>
      <p>{policy.description}</p>
      <Link to={`/user/apply/${policy.id}`}>Apply for this policy</Link>
      <br />
      <Link to="/user/policies">Back to policies</Link>
    </div>
  );
}
