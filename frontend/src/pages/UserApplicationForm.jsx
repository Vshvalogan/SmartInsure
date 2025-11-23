// src/pages/UserApplicationForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createApplication, getAuth, getPolicyById } from "../services/api.js";

import HealthInsuranceForm from "../components/HealthInsuranceForm.jsx";
import VehicleInsuranceForm from "../components/VehicleInsuranceForm.jsx";
import HomeInsuranceForm from "../components/HomeInsuranceForm.jsx";
import TravelInsuranceForm from "../components/TravelInsuranceForm.jsx";
import LifeInsuranceForm from "../components/LifeInsuranceForm.jsx";

export default function UserApplicationForm() {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPolicy() {
      const data = await getPolicyById(policyId);
      if (!data) {
        setError("Unable to load policy.");
        return;
      }
      setPolicy(data);
    }
    loadPolicy();
  }, [policyId]);

  const handleChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    const auth = getAuth();
    if (!auth || !auth.user) {
      setError("You must be logged in.");
      return;
    }
  

    const premium = answers.calculated_premium;
  
    if (premium == null || premium === "" || isNaN(Number(premium))) {
      setError("Please calculate your premium before submitting the application.");
      return;
    }
  
    const body = {
      policy_id: Number(policyId),
      answers,
      premium: Number(premium),
    };
  
    const result = await createApplication(body);
    if (!result) {
      setError("Failed to submit application.");
      return;
    }
  
    navigate("/user/submitted");
  };
  

  if (!policy) {
    return (
      <div>
        <h2>Application form</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const type = policy.type ? policy.type.toLowerCase() : "";

  let formComponent = null;
  if (type === "health") {
    formComponent = (
      <HealthInsuranceForm policy={policy} answers={answers} onChange={handleChange} />
    );
  } else if (type === "vehicle") {
    formComponent = (
      <VehicleInsuranceForm policy={policy} answers={answers} onChange={handleChange} />
    );
  } else if (type === "home") {
    formComponent = (
      <HomeInsuranceForm policy={policy} answers={answers} onChange={handleChange} />
    );
  } else if (type === "travel") {
    formComponent = (
      <TravelInsuranceForm policy={policy} answers={answers} onChange={handleChange} />
    );
  } else if (type === "life") {
    formComponent = (
      <LifeInsuranceForm policy={policy} answers={answers} onChange={handleChange} />
    );
  } else {
    formComponent = <p>Unknown policy type.</p>;
  }

  return (
    <div>
      <h2>Apply for {policy.name}</h2>
      <p>Policy type: {policy.type}</p>

      <form onSubmit={handleSubmit}>
        {formComponent}
        <br />
        <button type="submit">Submit application</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
