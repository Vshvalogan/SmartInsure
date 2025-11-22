// src/components/VehicleInsuranceForm.jsx
export default function VehicleInsuranceForm({ onChange }) {
  return (
    <fieldset>
      <legend>Vehicle Details</legend>

      <label>
        Vehicle type
        <select
          defaultValue=""
          onChange={(e) => onChange("vehicle_type", e.target.value)}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
        </select>
      </label>
      <br />

      <label>
        Model
        <input
          type="text"
          placeholder="e.g. Toyota Corolla"
          onChange={(e) => onChange("model", e.target.value)}
        />
      </label>
      <br />

      <label>
        Year of manufacture
        <input
          type="number"
          min="1980"
          max="2100"
          onChange={(e) => onChange("year", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Vehicle value ($)
        <input
          type="number"
          min="0"
          placeholder="e.g. 30000"
          onChange={(e) => onChange("vehicle_value", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Registration number
        <input
          type="text"
          placeholder="e.g. SGX1234A"
          onChange={(e) => onChange("registration", e.target.value)}
        />
      </label>
      <br />

      <label>
        Accident history (number of incidents)
        <input
          type="number"
          min="0"
          onChange={(e) => onChange("accidents", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Driving licence number
        <input
          type="text"
          onChange={(e) => onChange("license", e.target.value)}
        />
      </label>
    </fieldset>
  );
}
