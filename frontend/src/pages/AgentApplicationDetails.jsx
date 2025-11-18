import { useParams } from "react-router-dom";

export default function AgentApplicationDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Application {id}</h2>

      <p>Show customer personal details</p>
      <button>Approve</button>
      <button>Reject</button>
    </div>
  );
}
