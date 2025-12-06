import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import girl from '../../assets/girl.jpg'
import boy from '../../assets/boy.png'

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    img: boy,
    desc: "Dedicated to leading our company with vision and integrity.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    img: boy,
    desc: "Innovative mind behind our technical excellence.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "COO",
    img: boy,
    desc: "Ensures smooth operations across all departments.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Head",
    img: girl,
    desc: "Drives our brand and customer engagement strategies.",
  },
];

const TeamSection = () => {
  const [current, setCurrent] = useState(0);
  const length = teamMembers.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="w-full py-12 bg-white">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
        Meet Our Dedicated Team
      </h2>

      <div className="relative max-w-4xl mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-gray-200 p-3 rounded-full hover:bg-gray-300"
        >
          &#10094;
        </button>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={teamMembers[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-lime-50 p-6 rounded-xl text-center shadow-lg w-80"
          >
            <img
              src={teamMembers[current].img}
              alt={teamMembers[current].name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{teamMembers[current].name}</h3>
            <p className="text-gray-500 mb-2">{teamMembers[current].role}</p>
            <p className="text-gray-700">{teamMembers[current].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 bg-gray-200 p-3 rounded-full hover:bg-gray-300"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default TeamSection;
