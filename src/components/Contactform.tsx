import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Send Message</button>
    </form>
  );
};

export default ContactForm;
