import { useState, useEffect } from "react";
import "../styles/MyReservations.css";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ===============================
  // FORMAT DATE
  // ===============================

  const formatDate = (date) => {
    if (!date) return "";

    return String(date).split("T")[0];
  };

  // ===============================
  // FETCH LOGGED-IN USER RESERVATIONS
  // ===============================

  const handleSearch = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://react-first-79uv.onrender.com/api/reservations/me",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error fetching reservations:", data);
        return;
      }

      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // ===============================
  // LOAD RESERVATIONS
  // ===============================

  useEffect(() => {
    handleSearch();
  }, []);

  // ===============================
  // UPDATE RESERVATION
  // ===============================

  const handleUpdateReservation = async () => {
    if (!editReservation) return;

    const selectedDate = formatDate(editReservation.date);

    const payload = {
      name: editReservation.name,
      email: editReservation.email,
      phone: editReservation.phone,
      date: selectedDate,
      time: editReservation.time,
      guests: Number(editReservation.guests),
      table_id: editReservation.table_id,
    };

    console.log("UPDATE PAYLOAD:", payload);

    try {
      const response = await fetch(
        `https://react-first-79uv.onrender.com/api/reservations/${editReservation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("UPDATE RESPONSE:", data);

      alert(data.message);

      if (!response.ok) {
        return;
      }

      await handleSearch();

      setEditReservation(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Unable to update reservation.");
    }
  };

  // ===============================
  // DELETE RESERVATION
  // ===============================

  const handleDeleteReservation = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://react-first-79uv.onrender.com/api/reservations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (!response.ok) {
        return;
      }

      await handleSearch();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete reservation.");
    }
  };

  return (
    <div className="my-reservations-container">

      <h1>My Reservations</h1>

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="reservation-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>

                <td>
                  {reservation.name}
                </td>

                <td>
                  {formatDate(reservation.date)}
                </td>

                <td>
                  {reservation.time}
                </td>

                <td>
                  {reservation.guests}
                </td>

                <td>
                  {reservation.table_id}
                </td>

                <td>

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() =>
                      setEditReservation(reservation)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteReservation(
                        reservation.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

      {/* ===============================
          EDIT POPUP
      =============================== */}

      {editReservation && (
        <div className="edit-popup">

          <h2>Edit Reservation</h2>

          {/* DATE */}

          <label>Date</label>

          <input
            type="date"
            value={formatDate(editReservation.date)}
            onChange={(e) =>
              setEditReservation({
                ...editReservation,
                date: e.target.value,
              })
            }
          />

          {/* TIME */}

          <label>Time</label>

          <input
            type="time"
            value={editReservation.time || ""}
            onChange={(e) =>
              setEditReservation({
                ...editReservation,
                time: e.target.value,
              })
            }
          />

          {/* PHONE */}

          <label>Phone</label>

          <input
            type="text"
            value={editReservation.phone || ""}
            onChange={(e) =>
              setEditReservation({
                ...editReservation,
                phone: e.target.value,
              })
            }
          />

          {/* GUESTS */}

          <label>Guests</label>

          <input
            type="number"
            min="1"
            value={editReservation.guests || ""}
            onChange={(e) =>
              setEditReservation({
                ...editReservation,
                guests: e.target.value,
              })
            }
          />

          {/* TABLE ID */}

          <label>Table ID</label>

          <input
            type="number"
            value={editReservation.table_id || ""}
            onChange={(e) =>
              setEditReservation({
                ...editReservation,
                table_id: e.target.value,
              })
            }
          />

          {/* BUTTONS */}

          <div className="popup-buttons">

            <button
              type="button"
              className="update-btn"
              onClick={handleUpdateReservation}
            >
              Update
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setEditReservation(null)
              }
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default MyReservations;