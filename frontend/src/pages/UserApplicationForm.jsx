// src/pages/UserApplicationForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createApplication, getAuth, getPolicyById } from "../services/api.js";

export default function UserApplicationForm() {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getPolicyById(policyId);
      if (!data) {
        setError("Unable to load policy.");
        return;
      }
      setPolicy(data);
    }
    load();
  }, [policyId]);

  const handleChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const auth = getAuth();
    if (!auth || !auth.user) {
      setError("You must be logged in.");
      return;
    }

    const body = {
      user_id: auth.user.id,
      policy_id: Number(policyId),
      answers,
    };

    const result = await createApplication(body);
    if (!result) {
      setError("Failed to submit application.");
      return;
    }

    navigate("/user/submitted");
  };

  if (!policy) {
    return (
      <div>
        <h2>Application form</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const type = policy.type ? policy.type.toLowerCase() : "";

  return (
    <div>
      <h2>Apply for {policy.name}</h2>
      <form onSubmit={handleSubmit}>
        {/* HEALTH */}
        {type === "health" && (
          <>
            <label>
              Height (cm)
              <input
                type="number"
                onChange={(e) => handleChange("height", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Weight (kg)
              <input
                type="number"
                onChange={(e) => handleChange("weight", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Age
              <input
                type="number"
                onChange={(e) => handleChange("age", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Pre-existing diseases (yes/no)
              <input
                type="text"
                onChange={(e) =>
                  handleChange("pre_existing", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Smoker (yes/no)
              <input
                type="text"
                onChange={(e) => handleChange("smoker", e.target.value)}
              />
            </label>
          </>
        )}

        {/* VEHICLE */}
        {type === "vehicle" && (
          <>
            <label>
              Vehicle type
              <input
                type="text"
                onChange={(e) =>
                  handleChange("vehicle_type", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Model
              <input
                type="text"
                onChange={(e) => handleChange("model", e.target.value)}
              />
            </label>
            <br />
            <label>
              Year of manufacture
              <input
                type="number"
                onChange={(e) => handleChange("year", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Vehicle value
              <input
                type="number"
                onChange={(e) =>
                  handleChange("vehicle_value", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Registration number
              <input
                type="text"
                onChange={(e) =>
                  handleChange("registration", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Accident history (number of incidents)
              <input
                type="number"
                onChange={(e) =>
                  handleChange("accidents", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Driving licence number
              <input
                type="text"
                onChange={(e) => handleChange("license", e.target.value)}
              />
            </label>
          </>
        )}

        {/* HOME */}
        {type === "home" && (
          <>
            <label>
              Property type
              <input
                type="text"
                onChange={(e) =>
                  handleChange("property_type", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Location
              <input
                type="text"
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </label>
            <br />
            <label>
              Estimated market value
              <input
                type="number"
                onChange={(e) =>
                  handleChange("value", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Year built
              <input
                type="number"
                onChange={(e) =>
                  handleChange("year_built", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Number of residents
              <input
                type="number"
                onChange={(e) =>
                  handleChange("residents", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Fire safety compliant (yes/no)
              <input
                type="text"
                onChange={(e) =>
                  handleChange("fire_safety", e.target.value)
                }
              />
            </label>
          </>
        )}

        {/* TRAVEL */}
        {type === "travel" && (
          <>
            <label>
              Destination country
              <input
                type="text"
                onChange={(e) =>
                  handleChange("destination", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Trip duration (days)
              <input
                type="number"
                onChange={(e) =>
                  handleChange("duration_days", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Purpose of travel
              <input
                type="text"
                onChange={(e) => handleChange("purpose", e.target.value)}
              />
            </label>
            <br />
            <label>
              Age
              <input
                type="number"
                onChange={(e) => handleChange("age", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Medical history
              <input
                type="text"
                onChange={(e) =>
                  handleChange("medical_history", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Passport expiry date
              <input
                type="date"
                onChange={(e) =>
                  handleChange("passport_expiry", e.target.value)
                }
              />
            </label>
          </>
        )}

        {/* LIFE */}
        {type === "life" && (
          <>
            <label>
              Marital status
              <input
                type="text"
                onChange={(e) =>
                  handleChange("marital_status", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Number of dependents
              <input
                type="number"
                onChange={(e) =>
                  handleChange("dependents", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Age
              <input
                type="number"
                onChange={(e) => handleChange("age", Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Income (per month)
              <input
                type="number"
                onChange={(e) =>
                  handleChange("income", Number(e.target.value))
                }
              />
            </label>
            <br />
            <label>
              Occupation risk level
              <input
                type="text"
                onChange={(e) =>
                  handleChange("occupation_risk", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Pre-existing medical conditions
              <input
                type="text"
                onChange={(e) =>
                  handleChange("medical_conditions", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Smoker status
              <input
                type="text"
                onChange={(e) => handleChange("smoker", e.target.value)}
              />
            </label>
          </>
        )}

        <br />
        <button type="submit">Submit application</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
