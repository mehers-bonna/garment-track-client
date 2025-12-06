import React from 'react';
import { motion } from 'framer-motion';
import banner2 from '../../assets/gtBanner2.jpg'

const AboutUsSection = () => {
  return (
    <section className="w-9/12 mx-auto py-20 bg-lime-50 rounded-3xl mt-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl font-bold mb-4">About GarmentTrack</h2>
          <p className="text-gray-700 mb-4">
            GarmentTrack is a state-of-the-art Garments Order & Production Tracker System designed to streamline
            the workflow of garment businesses. From order placement to production completion, we ensure every step
            is monitored and managed efficiently.
          </p>
          <p className="text-gray-700">
            Our mission is to help businesses increase productivity, reduce errors, and improve transparency in
            garment production and order tracking. With GarmentTrack, managing orders has never been easier.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src={banner2}
            alt="About Us"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
