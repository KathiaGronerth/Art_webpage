import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Clear the form data immediately upon submission
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     comments: "",
  //   });

  //   try {
  //     const response = await axios.post("/api/contact", formData);
  //     console.log("Email sent:", response.data);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", formData);
      console.log("Email sent:", response.data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error sending email:", error.response || error.message);
      alert("Failed to send email: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="contact-container">
      <p>Contact the Artist</p>
      <div className="contact-square">
        <div className="contact-info">
          <p>Carl Canga Art</p>
          <p>carl.canga@outlook.com</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name (required)"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address (required)"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="comments"
            placeholder="Comments"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
