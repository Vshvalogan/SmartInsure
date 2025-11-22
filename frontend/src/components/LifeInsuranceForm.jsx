// src/components/LifeInsuranceForm.jsx
export default function LifeInsuranceForm({ onChange }) {
  return (
    <fieldset>
      <legend>Life Details</legend>

      <label>
        Marital status
        <select
          defaultValue=""
          onChange={(e) => onChange("marital_status", e.target.value)}
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
        </select>
      </label>
      <br />

      <label>
        Number of dependents
        <input
          type="number"
          min="0"
          onChange={(e) => onChange("dependents", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Age
        <input
          type="number"
          min="0"
          onChange={(e) => onChange("age", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Income (per month, $)
        <input
          type="number"
          min="0"
          onChange={(e) => onChange("income", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Occupation risk level
        <select
          defaultValue=""
          onChange={(e) => onChange("occupation_risk", e.target.value)}
        >
          <option value="" disabled>
            Select risk
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />

      <label>
        Pre-existing medical conditions
        <input
          type="text"
          onChange={(e) =>
            onChange("medical_conditions", e.target.value)
          }
        />
      </label>
      <br />

      <label>
        Smoker status
        <select
          defaultValue=""
          onChange={(e) => onChange("smoker", e.target.value)}
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="no">Non-smoker</option>
          <option value="yes">Smoker</option>
        </select>
      </label>
    </fieldset>
  );
}
