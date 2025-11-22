// src/pages/AgentApplicationDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationById,
  updateApplicationStatus,
} from "../services/api.js";

export default function AgentApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getApplicationById(id);
      if (!data) {
        setError("Unable to load application.");
        return;
      }
      setApplication(data);
    }
    load();
  }, [id]);

  const handleDecision = async (status) => {
    setSaving(true);
    setError("");
    const updated = await updateApplicationStatus(id, { status });
    if (!updated) {
      setError("Failed to update application.");
    } else {
      setApplication(updated);
    }
    setSaving(false);
  };

  if (!application) {
    return (
      <div>
        <h2>Application details</h2>
        <p>Loading...</p>
      </div>
    );
  }

  let answersText = "";
  try {
    answersText = JSON.stringify(application.answers, null, 2);
  } catch (e) {
    answersText = String(application.answers);
  }

  return (
    <div>
      <h2>Application #{application.id}</h2>
      {error && <p>{error}</p>}
      <p>User ID: {application.user_id}</p>
      <p>Policy ID: {application.policy_id}</p>
      <p>Status: {application.status}</p>
      <p>
        Submitted:{" "}
        {application.submitted_at
          ? new Date(application.submitted_at).toLocaleString()
          : "-"}
      </p>

      <h3>Answers</h3>
      <pre>{answersText}</pre>
      {application.status === "pending" && (
  <div>
    <button
      type="button"
      onClick={() => handleDecision("approved")}
      disabled={saving}
    >
      Approve
    </button>

    <button
      type="button"
      onClick={() => handleDecision("rejected")}
      disabled={saving}
    >
      Reject
    </button>
  </div>
)}

    </div>
  );
}
