// src/components/PolicyCard.jsx
import { Link } from "react-router-dom";

export default function PolicyCard({ policy, to }) {
  return (
    <div>
      <h3>{policy.name}</h3>
      <p>Type: {policy.type}</p>
      <p>Premium: {policy.premium}</p>
      <p>Coverage: {policy.coverage_amount}</p>
      <p>{policy.description}</p>
      {to && <Link to={to}>View details</Link>}
    </div>
  );
}
