// src/components/HomeInsuranceForm.jsx
import { useState } from "react";

export default function HomeInsuranceForm({ policy, answers, onChange }) {
  const [premium, setPremium] = useState(null);

  const handleCalculate = () => {
    const basePremium = Number(policy.premium) || 0;

    const currentYear = new Date().getFullYear();
    const yearBuilt = Number(answers.year_built || 0);
    const propertyAge = yearBuilt > 0 ? currentYear - yearBuilt : 0;

    const propertyAgeFactor = propertyAge / 40;
    const residents = Number(answers.residents || 0);
    const residentsFactor = residents * 0.05;
    const fireSafetyFactor = answers.fire_safety === "no" ? 0.2 : 0;
    const propertyValue = Number(answers.value || 0);
    const valueFactor = propertyValue / 1_000_000;

    const totalFactor =
      1 + propertyAgeFactor + residentsFactor + fireSafetyFactor + valueFactor;
    const finalPremium = Math.round(basePremium * totalFactor);

    setPremium(finalPremium);
    onChange("calculated_premium", finalPremium);
  };

  return (
    <div>
      <h3>Home details</h3>

      <label>
        Property type
        <select
          value={answers.property_type || ""}
          onChange={(e) => onChange("property_type", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="hdb">HDB</option>
          <option value="condo">Condo</option>
          <option value="landed">Landed</option>
        </select>
      </label>

      <label>
        Location
        <input
          type="text"
          value={answers.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
        />
      </label>

      <label>
        Estimated market value
        <input
          type="number"
          min="0"
          value={answers.value || ""}
          onChange={(e) => onChange("value", Number(e.target.value))}
        />
      </label>

      <label>
        Year built
        <input
          type="number"
          min="1950"
          max={new Date().getFullYear()}
          value={answers.year_built || ""}
          onChange={(e) => onChange("year_built", Number(e.target.value))}
        />
      </label>

      <label>
        Number of residents
        <input
          type="number"
          min="1"
          value={answers.residents || ""}
          onChange={(e) => onChange("residents", Number(e.target.value))}
        />
      </label>

      <label>
        Fire safety compliant
        <select
          value={answers.fire_safety || ""}
          onChange={(e) => onChange("fire_safety", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
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
