import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="w-full py-20 bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center">Contact Us</h2>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#442C2E] text-white font-semibold py-3 rounded-lg hover:bg-[#D6A99D]  transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Company Info */}
        <div className="mt-16 text-gray-700 space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Our Address & Info</h3>
          <p>📍 123 Garment Street, Dhaka, Bangladesh</p>
          <p>📧 Email: support@garmenttrack.com</p>
          <p>📞 Phone: +880 123 456 789</p>
          <p>⏰ Working Hours: Mon - Sat, 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
