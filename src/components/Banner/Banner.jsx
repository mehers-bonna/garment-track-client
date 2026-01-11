import React from 'react';
import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/gtBanner1.jpg'
import banner2 from '../../assets/gtBanner2.jpg'
import banner3 from '../../assets/gtBanner3.jpg'
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="w-9/12 mx-auto h-[70vh] relative overflow-hidden rounded-3xl mt-10">
      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={3500}
        transitionTime={900}
      >
        <div>
          <img
            src={banner1}
            alt="Slide 1"
            className="w-full h-[80vh] object-cover"
          />
        </div>
        <div>
          <img
            src={banner2}
            alt="Slide 2"
            className="w-full h-[80vh] object-cover"
          />
        </div>
        <div>
          <img
            src={banner3}
            alt="Slide 3"
            className="w-full h-[80vh] object-cover"
          />
        </div>
      </Carousel>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center text-white px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          >
            Discover Premium Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl mb-6 max-w-2xl mx-auto"
          >
            Quality that speaks for itself. Explore our collection and find the perfect product for you.
          </motion.p>
           <Link to='/all-products'>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#D6A99D] text-black font-semibold rounded-full shadow-lg"
          >
            View Products
          </motion.button>
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Banner;
