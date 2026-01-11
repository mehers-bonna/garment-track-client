import React from "react";
import { motion } from "framer-motion";
import brand1 from "../../assets/brand-1.png";
import brand2 from "../../assets/brand-2.png";
import brand3 from "../../assets/brand-3.png";
import brand4 from "../../assets/brand-4.png";

const BrandsSection = () => {
  const brands = [
    { id: 1, img: brand1 },
    { id: 2, img: brand2 },
    { id: 3, img: brand3 },
    { id: 4, img: brand4 },
  ];

  return (
    /* added bg-lime-50 dark:bg-[#1a1a1a] and border for dark mode */
    <div className="w-full py-12 bg-lime-50 dark:bg-[#1a1a1a] overflow-hidden rounded-3xl transition-colors duration-300 border dark:border-gray-800 -mt-12">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-[#442C2E] dark:text-[#FEEAE6]">
        Our Trusted Brands
      </h2>

      {/* auto scrolling marquee */}
      <div className="relative w-full">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <img
              key={index}
              src={brand.img}
              alt="brand"
              /* dark:brightness-125 dark:contrast-125 added to make logos clear on dark bg */
              className="w-20 h-20 grayscale hover:grayscale-0 dark:brightness-200 dark:contrast-100 transition duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsSection;