import { Link } from "react-router-dom";

export default function UserPolicyList() {
  const policies = [
    { id: 1, name: "Health Insurance" },
    { id: 2, name: "Life Insurance" },
    { id: 3, name: "Vehicle Insurance" },
  ];

  return (
    <div>
      <h2>Our Policies</h2>

      {policies.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <Link to={`/policy/${p.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
