// src/components/LifeInsuranceForm.jsx
import { useState } from "react";

export default function LifeInsuranceForm({ policy, answers, onChange }) {
  const [premium, setPremium] = useState(null);

  const handleCalculate = () => {
    const basePremium = Number(policy.premium) || 0;

    const age = Number(answers.age || 0);

    const ageFactor = age > 0 ? age / 37 : 0;
    let healthRisks = 0;
    if (answers.smoker === "yes") healthRisks++;
    if (answers.medical_conditions === "yes") healthRisks++;
    if (answers.occupation_risk === "high") healthRisks++;
    if (answers.family_history === "yes") healthRisks++;
    const healthFactor = Math.min(healthRisks * 0.25, 1.0);

    const desiredCoverage = Number(
      answers.desired_coverage || policy.coverage_amount || 0
    );
    const baseCoverage = Number(policy.coverage_amount) || 100000;
    const coverageFactor =
      baseCoverage > 0 ? (desiredCoverage / baseCoverage) * 0.1 : 0;

    const totalFactor = 1 + ageFactor + healthFactor + coverageFactor;
    const finalPremium = Math.round(basePremium * totalFactor);

    setPremium(finalPremium);
    onChange("calculated_premium", finalPremium);
  };

  return (
    <div>
      <h3>Life insurance details</h3>

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
        Marital status
        <select
          value={answers.marital_status || ""}
          onChange={(e) => onChange("marital_status", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
        </select>
      </label>

      <label>
        Number of dependents
        <input
          type="number"
          min="0"
          value={answers.dependents || ""}
          onChange={(e) => onChange("dependents", Number(e.target.value))}
        />
      </label>

      <label>
        Monthly income
        <input
          type="number"
          min="0"
          value={answers.income || ""}
          onChange={(e) => onChange("income", Number(e.target.value))}
        />
      </label>

      <label>
        Occupation risk level
        <select
          value={answers.occupation_risk || ""}
          onChange={(e) => onChange("occupation_risk", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Pre-existing medical conditions
        <select
          value={answers.medical_conditions || ""}
          onChange={(e) => onChange("medical_conditions", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label>
        Family history of critical illness
        <select
          value={answers.family_history || ""}
          onChange={(e) => onChange("family_history", e.target.value)}
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

      <label>
        Desired coverage amount
        <input
          type="number"
          min="0"
          value={answers.desired_coverage || ""}
          onChange={(e) =>
            onChange("desired_coverage", Number(e.target.value))
          }
        />
      </label>

      <button type="button" onClick={handleCalculate}>
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
