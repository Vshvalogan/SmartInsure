// src/components/HealthInsuranceForm.jsx
export default function HealthInsuranceForm({ onChange }) {
  return (
    <fieldset>
      <legend>Health Details</legend>

      <label>
        Height (cm)
        <input
          type="number"
          min="0"
          placeholder="e.g. 165"
          onChange={(e) => onChange("height", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Weight (kg)
        <input
          type="number"
          min="0"
          placeholder="e.g. 62"
          onChange={(e) => onChange("weight", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Age
        <input
          type="number"
          min="0"
          placeholder="e.g. 30"
          onChange={(e) => onChange("age", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Pre-existing diseases
        <select
          defaultValue=""
          onChange={(e) => onChange("pre_existing", e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
      <br />

      <label>
        Smoker
        <select
          defaultValue=""
          onChange={(e) => onChange("smoker", e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>
    </fieldset>
  );
}
