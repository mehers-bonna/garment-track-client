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
    <div className="w-9/12 mx-auto py-12 bg-white dark:bg-[#0f0f0f] transition-colors duration-300 -mt-12">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-[#442C2E] dark:text-[#FEEAE6]">
        Meet Our Dedicated Team
      </h2>

      <div className="relative max-w-4xl mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="z-10 absolute left-[-20px] md:left-0 bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
        >
          &#10094;
        </button>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={teamMembers[current].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-lime-50 dark:bg-[#1a1a1a] p-8 rounded-3xl text-center shadow-xl w-full max-w-md border dark:border-gray-800 transition-colors"
          >
            <img
              src={teamMembers[current].img}
              alt={teamMembers[current].name}
              className="w-32 h-32 mx-auto rounded-full mb-6 object-cover border-4 border-white dark:border-gray-700 shadow-md"
            />
            <h3 className="text-2xl font-bold text-[#442C2E] dark:text-[#FEEAE6] mb-1">
              {teamMembers[current].name}
            </h3>
            <p className="text-lime-600 dark:text-lime-400 font-medium mb-4">
              {teamMembers[current].role}
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{teamMembers[current].desc}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="z-10 absolute right-[-20px] md:right-0 bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default TeamSection;