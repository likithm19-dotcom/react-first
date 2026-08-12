import { useState, useEffect } from "react";
import "../styles/reservation.css";

function Reservation() {
  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [tables, setTables] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    date: "",
    time: "",
    guests: "",
    table_id: "",
  });

  // Get tables
  useEffect(() => {
    fetch("https://react-first-79uv.onrender.com/api/tables")
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
      })
      .catch((err) => {
        console.error("Error fetching tables:", err);
      });
  }, []);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit reservation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("Submitting reservation:", formData);

      const response = await fetch(
        "https://react-first-79uv.onrender.com/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // Error
      if (!response.ok) {
        alert(data.message || "Reservation failed.");
        return;
      }

      // Success
      alert(data.message || "Reservation added successfully!");

      // Reset reservation fields
      // Keep logged-in user's details
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        date: "",
        time: "",
        guests: "",
        table_id: "",
      });
    } catch (error) {
      console.error("Reservation Error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-page">
      <div className="reservation-card">
        <h1>Reserve a Table</h1>

        <p className="reservation-subtitle">
          Book your table at Nawabs Restaurant
        </p>

        <form className="reservation-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              readOnly
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label>Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Guests */}
          <div className="form-group">
            <label>Number of Guests</label>

            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          {/* Table */}
          <div className="form-group">
            <label>Select a Table</label>

            <select
              name="table_id"
              value={formData.table_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a table</option>

              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.table_number} - {table.capacity} seats
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="reservation-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting reservation..."
              : "Reserve Table"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reservation;