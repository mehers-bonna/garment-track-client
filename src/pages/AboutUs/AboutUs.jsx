import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import banner2 from '../../assets/gtBanner2.jpg'
import { FaEye, FaHandshake, FaChartLine, FaGavel } from 'react-icons/fa';
import aboutUs1 from '../../assets/aboutUs1.png'
import aboutUs2 from '../../assets/aboutUs2.png'
import aboutUs3 from '../../assets/aboutUs3.png'

const aboutUsData = [
    {
        id: 1,
        title: "Mission & Vision: Empowering Production",
        content: "Our mission is to empower garment businesses globally by providing a seamless, highly efficient order and production tracking system. We aim to be the industry standard for supply chain transparency and management.",
        icon: FaEye,
        image: banner2, 
    },
    {
        id: 2,
        title: "Core Features: Real-time Tracking & QC",
        content: "GarmentTrack offers real-time status updates on every order, from fabric sourcing and cutting to stitching and final quality control (QC). Managers can track milestones instantly, minimizing delays and errors.",
        icon: FaChartLine,
        image: aboutUs1,
    },
    {
        id: 3,
        title: "Ensuring Transparency & Trust",
        content: "We foster trust between buyers, managers, and factory owners. Our platform provides a transparent, single source of truth for all operations, ensuring accountability and improving collaboration across teams.",
        icon: FaHandshake,
        image: aboutUs2,
    },
    {
        id: 4,
        title: "Roles and Permissions Control",
        content: "The system provides granular control over user roles, including Admin, Manager, and Buyer. This ensures that every user only accesses the data and functions relevant to their specific responsibilities.",
        icon: FaGavel,
        image: aboutUs3,
    },
];

const ITEMS_PER_PAGE = 1;

const AboutUsSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(aboutUsData.length / ITEMS_PER_PAGE);
    
    const currentItem = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return aboutUsData.slice(startIndex, startIndex + ITEMS_PER_PAGE)[0]; 
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);
    
    if (!currentItem) return <div className="text-center py-20 dark:text-[#FEEAE6]">Loading About Us Data...</div>;

    return (
        /* Added dark:bg-[#1a1a1a] and transition */
        <section className="w-11/12 lg:w-9/12 mx-auto py-20 bg-lime-50 dark:bg-[#1a1a1a] rounded-3xl mt-40 transition-colors duration-300 border dark:border-gray-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
                
                {/* Text Content */}
                <motion.div
                    key={`text-${currentPage}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2"
                >
                    <h2 className="text-4xl font-bold mb-4 flex items-center gap-3 text-[#442C2E] dark:text-[#FEEAE6]">
                        {currentItem.icon && <currentItem.icon className="text-5xl text-lime-600 dark:text-lime-400" />} 
                        {currentItem.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                        {currentItem.content}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 font-semibold mt-8 text-sm italic">
                        Showing Section {currentPage} of {totalPages}
                    </p>
                </motion.div>

                {/* Image */}
                <motion.div
                    key={`image-${currentPage}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2"
                >
                    <img
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="rounded-xl shadow-2xl object-cover w-full h-80 md:h-[400px] border-4 border-white dark:border-gray-700 transition-colors"
                    />
                </motion.div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-12 gap-3">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-5 py-2 bg-white dark:bg-[#2a2a2a] border border-[#442C2E] dark:border-gray-600 text-[#442C2E] dark:text-[#FEEAE6] rounded-lg disabled:opacity-30 hover:bg-lime-200 dark:hover:bg-gray-700 transition duration-300 shadow-sm"
                >
                    Previous
                </button>

                {/* Page Number Buttons */}
                {pageNumbers.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                            currentPage === page
                                ? 'bg-[#442C2E] text-white shadow-md'
                                : 'bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-lime-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 bg-white dark:bg-[#2a2a2a] border border-[#442C2E] dark:border-gray-600 text-[#442C2E] dark:text-[#FEEAE6] rounded-lg disabled:opacity-30 hover:bg-lime-200 dark:hover:bg-gray-700 transition duration-300 shadow-sm"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default AboutUsSection;