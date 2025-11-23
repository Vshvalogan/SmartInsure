// src/components/VehicleInsuranceForm.jsx
import { useState } from "react";

export default function VehicleInsuranceForm({ policy, answers, onChange }) {
  const [premium, setPremium] = useState(null);

  const handleCalculate = () => {
    const basePremium = Number(policy.premium) || 0;

    const currentYear = new Date().getFullYear();
    const year = Number(answers.year || 0);
    const vehicleAge = year > 0 ? currentYear - year : 0;
    const vehicleAgeFactor = vehicleAge / 20;
    const accidents = Number(answers.accidents || 0);
    const accidentFactor = accidents * 0.1;
    const vehicleValue = Number(answers.vehicle_value || 0);
    const vehicleValueFactor = vehicleValue / 200000;
    const totalFactor = 1 + vehicleAgeFactor + accidentFactor + vehicleValueFactor;
    const finalPremium = Math.round(basePremium * totalFactor);

    setPremium(finalPremium);
    onChange("calculated_premium", finalPremium);
  };

  return (
    <div>
      <h3>Vehicle details</h3>

      <label>
        Vehicle type
        <select
          value={answers.vehicle_type || ""}
          onChange={(e) => onChange("vehicle_type", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
        </select>
      </label>

      <label>
        Model
        <input
          type="text"
          value={answers.model || ""}
          onChange={(e) => onChange("model", e.target.value)}
        />
      </label>

      <label>
        Year of manufacture
        <input
          type="number"
          min="1990"
          max={new Date().getFullYear()}
          value={answers.year || ""}
          onChange={(e) => onChange("year", Number(e.target.value))}
        />
      </label>

      <label>
        Vehicle value
        <input
          type="number"
          min="0"
          value={answers.vehicle_value || ""}
          onChange={(e) =>
            onChange("vehicle_value", Number(e.target.value))
          }
        />
      </label>

      <label>
        Registration number
        <input
          type="text"
          value={answers.registration || ""}
          onChange={(e) => onChange("registration", e.target.value)}
        />
      </label>

      <label>
        Accident history (number of incidents)
        <input
          type="number"
          min="0"
          value={answers.accidents || ""}
          onChange={(e) => onChange("accidents", Number(e.target.value))}
        />
      </label>

      <label>
        Driving licence number
        <input
          type="text"
          value={answers.license || ""}
          onChange={(e) => onChange("license", e.target.value)}
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
