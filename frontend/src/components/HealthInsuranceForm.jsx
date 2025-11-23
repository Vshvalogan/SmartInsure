// src/components/HealthInsuranceForm.jsx
import { useState } from "react";

export default function HealthInsuranceForm({ policy, answers, onChange }) {
  const [premium, setPremium] = useState(null);

  const handleCalculate = () => {
    const basePremium = Number(policy.premium) || 0;

    const age = Number(answers.age || 0);
    const height = Number(answers.height || 0); 
    const weight = Number(answers.weight || 0); 

    let bmi = 0;
    if (height > 0) {
      const hM = height / 100;
      bmi = weight / (hM * hM);
    }
    const ageFactor = age / 60; 
    const bmiFactor = bmi < 25 ? 0 : (bmi - 25) * 0.02;
    const diseaseFactor = answers.pre_existing === "yes" ? 0.2 : 0;
    const smokerFactor = answers.smoker === "yes" ? 0.15 : 0;
    const totalFactor = 1 + ageFactor + bmiFactor + diseaseFactor + smokerFactor;
    const finalPremium = Math.round(basePremium * totalFactor);

    setPremium(finalPremium);
    onChange("calculated_premium", finalPremium);
  };

  return (
    <div>
      <h3>Health details</h3>

      <label>
        Age
        <input
          type="number"
          min="18"
          max="80"
          value={answers.age || ""}
          onChange={(e) => onChange("age", Number(e.target.value))}
        />
      </label>

      <label>
        Height (cm)
        <input
          type="number"
          min="100"
          max="250"
          value={answers.height || ""}
          onChange={(e) => onChange("height", Number(e.target.value))}
        />
      </label>

      <label>
        Weight (kg)
        <input
          type="number"
          min="30"
          max="200"
          value={answers.weight || ""}
          onChange={(e) => onChange("weight", Number(e.target.value))}
        />
      </label>

      <label>
        Pre-existing diseases
        <select
          value={answers.pre_existing || ""}
          onChange={(e) => onChange("pre_existing", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label>
        Smoker
        <select
          value={answers.smoker || ""}
          onChange={(e) => onChange("smoker", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <button
        type="button"      
        onClick={handleCalculate}
      >
        Calculate premium
      </button>

      {premium !== null && (
        <p>
          Estimated premium: <strong>${premium} / month</strong>
        </p>
      )}
    </div>
  );
}
