// src/components/TravelInsuranceForm.jsx
export default function TravelInsuranceForm({ onChange }) {
  return (
    <fieldset>
      <legend>Travel Details</legend>

      <label>
        Destination country
        <input
          type="text"
          onChange={(e) => onChange("destination", e.target.value)}
        />
      </label>
      <br />

      <label>
        Trip duration (days)
        <input
          type="number"
          min="1"
          onChange={(e) =>
            onChange("duration_days", Number(e.target.value))
          }
        />
      </label>
      <br />

      <label>
        Purpose of travel
        <select
          defaultValue=""
          onChange={(e) => onChange("purpose", e.target.value)}
        >
          <option value="" disabled>
            Select purpose
          </option>
          <option value="leisure">Leisure</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
        </select>
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
        Medical history
        <input
          type="text"
          onChange={(e) => onChange("medical_history", e.target.value)}
        />
      </label>
      <br />

      <label>
        Passport expiry date
        <input
          type="date"
          onChange={(e) => onChange("passport_expiry", e.target.value)}
        />
      </label>
    </fieldset>
  );
}
