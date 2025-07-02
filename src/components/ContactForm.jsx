import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message was sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="col-md-5 mb-30 offset-md-1">
      <div className="sidebar">
        <div className="right-sidebar">
          <div className="right-sidebar item">
            <h2>Get in touch</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form className="right-sidebar item-form contact__form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    name="phone"
                    type="text"
                    placeholder="Your Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="4"
                    placeholder="Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="butn-dark">
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
