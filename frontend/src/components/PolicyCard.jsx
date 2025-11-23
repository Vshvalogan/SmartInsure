// src/components/PolicyCard.jsx
import { Link } from "react-router-dom";
import { getAuth } from "../services/api.js";

export default function PolicyCard({ policy }) {
  const imgSrc = policy.image_url;

  const auth = getAuth();
  const role = auth?.user?.role;   // "user" or "agent"

  return (
    <div className="policy-card">
      <div className="policy-image">
        <img src={imgSrc} alt={policy.name} />
      </div>

      <div className="policy-content">
        <h3 className="policy-title">{policy.name}</h3>

        <ul className="policy-points">
          <li>✔ Coverage amount: ${policy.coverage_amount}</li>
          <li>✔ Premium: ${policy.premium}/month</li>
          <li>✔ Type: {policy.type}</li>
        </ul>

        <div className="policy-actions">
          <Link className="learn-btn" to={`${policy.id}`}>
            Learn more →
          </Link>
          {role === "user" && (
            <Link className="buy-btn" to={`apply/${policy.id}`}>
              BUY NOW
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
