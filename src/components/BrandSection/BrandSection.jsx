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
    <div className="w-full py-12 bg-gray-100 overflow-hidden rounded-3xl bg-lime-50">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
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
              className="w-20 h-20 grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsSection;
