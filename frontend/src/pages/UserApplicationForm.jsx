import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    bmi: "",
    smoker: false,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: API request here
    navigate("/submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Application Form for Policy {id}</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input name="age" placeholder="Age" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
}
