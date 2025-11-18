import { Link, useParams } from "react-router-dom";

export default function UserPolicyDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Full details of policy {id}</h2>
      <Link to={`/apply/${id}`}>Buy Now</Link>
    </div>
  );
}
