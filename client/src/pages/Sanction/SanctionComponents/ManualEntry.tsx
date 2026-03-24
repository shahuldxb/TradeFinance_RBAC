import { apiFetch } from "@/utils/apiFetch";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

const ManualEntry = () => {
  const [date, setDate] = useState(new Date(1984, 0, 20));
  const [nameInput, setNameInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [sourceInput, setSourceInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userID = localStorage.getItem("userID");
  console.log("Logged in userID:", userID);

  const handleSave = async () => {
    if (!nameInput || !countryInput || !sourceInput) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await apiFetch(`${API_BASE}/api/lc/sanction/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput,
          country: countryInput,
          source: sourceInput,
          user_id: Number(userID)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Failed to save entry.");
      } else {
        setMessage("Data saved successfully.");
        setNameInput("");
        setCountryInput("");
        setSourceInput("");
      }
    } catch (error) {
      setMessage("Server not reachable.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6 space-y-6 card">
      <div className="card-header" id="basic_settings">
        <h3 className="card-title">Manual Entry</h3>
      </div>
      <div className="card-body grid gap-5">

        {/* NAME */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Name</label>
            <input
              className="input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Name"
            />
          </div>
        </div>

        {/* COUNTRY */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Country</label>
            <input
              className="input"
              type="text"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              placeholder="Country"
            />
          </div>
        </div>

        {/* SOURCE */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Source</label>
            <input
              className="input"
              type="text"
              value={sourceInput}
              onChange={(e) => setSourceInput(e.target.value)}
              placeholder="ofac"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pt-2.5">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ManualEntry;
