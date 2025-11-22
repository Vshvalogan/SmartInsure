// src/components/HomeInsuranceForm.jsx
export default function HomeInsuranceForm({ onChange }) {
  return (
    <fieldset>
      <legend>Home Details</legend>

      <label>
        Property type
        <select
          defaultValue=""
          onChange={(e) => onChange("property_type", e.target.value)}
        >
          <option value="" disabled>
            Select property
          </option>
          <option value="hdb">HDB</option>
          <option value="condo">Condo</option>
          <option value="landed">Landed</option>
        </select>
      </label>
      <br />

      <label>
        Location
        <input
          type="text"
          placeholder="e.g. Tampines, Singapore"
          onChange={(e) => onChange("location", e.target.value)}
        />
      </label>
      <br />

      <label>
        Estimated market value ($)
        <input
          type="number"
          min="0"
          onChange={(e) => onChange("value", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Year built
        <input
          type="number"
          min="1950"
          max="2100"
          onChange={(e) => onChange("year_built", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Number of residents
        <input
          type="number"
          min="1"
          onChange={(e) => onChange("residents", Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        Fire safety compliant
        <select
          defaultValue=""
          onChange={(e) => onChange("fire_safety", e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
    </fieldset>
  );
}
