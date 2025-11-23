// src/components/TravelInsuranceForm.jsx
import { useState } from "react";

const RISK_COUNTRIES = [
  "afghanistan",
  "syria",
  "iraq",
  "north korea",
  "somalia",
  "yemen",
  "ukraine",
  "sudan",
  "congo",
  "russia",
  "lebanon",
  "iran",
];

export default function TravelInsuranceForm({ policy, answers, onChange }) {
  const [premium, setPremium] = useState(null);

  const handleCalculate = () => {
    const basePremium = Number(policy.premium) || 0;

    const age = Number(answers.age || 0);
    const duration = Number(answers.duration_days || 0);
    const destination = (answers.destination || "").toLowerCase().trim();
    const ageFactor = age > 0 ? age / 70 : 0;
    const durationFactor = duration * 0.02;
    const riskCountryFactor = RISK_COUNTRIES.includes(destination)
      ? 0.5
      : 0;
    const medicalFactor =
      answers.medical_condition === "yes" ? 0.25 : 0;

    const totalFactor =
      1 + ageFactor + durationFactor + riskCountryFactor + medicalFactor;
    const finalPremium = Math.round(basePremium * totalFactor);

    setPremium(finalPremium);
    onChange("calculated_premium", finalPremium);
  };

  return (
    <div>
      <h3>Travel details</h3>

      <label>
        Destination country
        <input
          type="text"
          value={answers.destination || ""}
          onChange={(e) => onChange("destination", e.target.value)}
        />
      </label>

      <label>
        Trip duration (days)
        <input
          type="number"
          min="1"
          value={answers.duration_days || ""}
          onChange={(e) =>
            onChange("duration_days", Number(e.target.value))
          }
        />
      </label>

      <label>
        Purpose of travel
        <select
          value={answers.purpose || ""}
          onChange={(e) => onChange("purpose", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="holiday">Holiday</option>
          <option value="business">Business</option>
          <option value="study">Study</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Age
        <input
          type="number"
          min="1"
          max="90"
          value={answers.age || ""}
          onChange={(e) => onChange("age", Number(e.target.value))}
        />
      </label>

      <label>
        Existing medical condition?
        <select
          value={answers.medical_condition || ""}
          onChange={(e) => onChange("medical_condition", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <label>
        Passport expiry date
        <input
          type="date"
          value={answers.passport_expiry || ""}
          onChange={(e) => onChange("passport_expiry", e.target.value)}
        />
      </label>

      <button type="button" onClick={handleCalculate}>
        Calculate premium
      </button>

      {premium !== null && (
        <p>
          Estimated premium: <strong>${premium} / trip</strong>
        </p>
      )}
    </div>
  );
}
