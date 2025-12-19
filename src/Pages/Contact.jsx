import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic here (API call)
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-center text-4xl font-bold text-pink-600 mb-10">Contact Us</h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Side - Image */}
        <div className="md:w-1/2">
          <img
            src="/images/contact-image.jpg" // replace with your image path
            alt="Contact Us"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <motion.div
          className="md:w-1/2 bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-pink-800 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2 text-pink-600">Email Us</h3>
          <p className="text-gray-500">support@homedecor.com</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2 text-pink-600">Call Us</h3>
          <p className="text-gray-500">+880 1234 567890</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2 text-pink-600">Visit Us</h3>
          <p className="text-gray-500">123 Home Decor Street, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
