// src/components/PolicyCard.jsx
import { Link } from "react-router-dom";

export default function PolicyCard({ policy }) {
  const imgSrc = policy.image_url ;

  return (
    <div className="policy-card">
      <div className="policy-image">
        <img src={imgSrc} alt={policy.name} />
      </div>

      <div className="policy-content">
        <h3 className="policy-title">{policy.name}</h3>

        <p className="policy-desc">
          {policy.description?.slice(0, 120) ||
            "Comprehensive insurance coverage."}
        </p>

        <ul className="policy-points">
          <li>✔ Coverage amount: ${policy.coverage_amount}</li>
          <li>✔ Premium: ${policy.premium}/month</li>
          <li>✔ Type: {policy.type}</li>
        </ul>

        <div className="policy-actions">
          <Link className="learn-btn" to={`${policy.id}`}>
            Learn more →
          </Link>
          <p></p>
          <Link className="buy-btn" to={`apply/${policy.id}`}>
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
