import { useState } from 'react';
import '../styles/reservation.css';

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reservation submitted!');
    console.log(formData);
  };

  return (
    <div className="reservation-container">
      <h1>Reserve a Table</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={formData.guests}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Reservation;
