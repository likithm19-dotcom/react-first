import { useState } from "react";
import "../styles/contact.css";

function Contact() {
  console.log("Contact component loaded");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
    time: "",
    table_id: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("https://react-first-79uv.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  // Return 
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Reach us for reservations and inquiries.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
        type="date"
        name="date"
        placeholder="Your Date"
        value={formData.date}
        onChange={handleChange}
        required
        />
        <input 
        type="time"
        name="time"
        placeholder="Your Time"
        value={formData.time}
        onChange={handleChange}
        required
        />
        <input 
        type="number"
        name="table_id"
        placeholder="Table ID"
        value={formData.table_id}
        onChange={handleChange}
        required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;