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
    /* added bg-white dark:bg-[#0f0f0f] and transition */
    <section className="w-full py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300 ">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto px-6 mb-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-[#FEEAE6]">
          Contact Us
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* Input Fields with Dark Mode Support */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E] dark:focus:ring-lime-500 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E] dark:focus:ring-lime-500 transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#442C2E] dark:focus:ring-lime-500 transition-all"
          ></textarea>

          <button
            type="submit"
            className="bg-[#442C2E] dark:bg-[#D6A99D] text-white dark:text-[#442C2E] font-bold py-3 rounded-lg hover:bg-[#D6A99D] dark:hover:bg-[#FEEAE6] transition-colors duration-300"
          >
            Send Message
          </button>
        </motion.form>

        {/* Company Info with Dark Mode Text */}
        <div className="mt-16 text-gray-700 dark:text-gray-300 space-y-4 bg-gray-50 dark:bg-[#1a1a1a] p-8 rounded-2xl border dark:border-gray-800 transition-colors">
          <h3 className="text-2xl font-semibold mb-4 text-[#442C2E] dark:text-[#FEEAE6]">
            Our Address & Info
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <p className="flex items-center gap-2">📍 123 Garment Street, Dhaka, Bangladesh</p>
            <p className="flex items-center gap-2">📧 Email: support@garmenttrack.com</p>
            <p className="flex items-center gap-2">📞 Phone: +880 123 456 789</p>
            <p className="flex items-center gap-2">⏰ Working Hours: Mon - Sat, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;