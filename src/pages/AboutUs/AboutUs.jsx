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
    
    if (!currentItem) return <div className="text-center py-20">Loading About Us Data...</div>;


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
                    <h2 className="text-4xl font-bold mb-4 flex items-center gap-3 text-[#442C2E]">
                        {currentItem.icon && <currentItem.icon className="text-5xl" />} 
                        {currentItem.title}
                    </h2>
                    <p className="text-gray-700 mb-4 text-lg">
                        {currentItem.content}
                    </p>
                    <p className="text-gray-500 font-semibold mt-8 text-sm">
                        Showing Section {currentPage} of {totalPages}
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
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="rounded-xl shadow-lg object-cover w-full h-80 md:h-[400px]"
                    />
                </motion.div>
            </div>
            <div className="flex justify-center mt-12 gap-3">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-[#442C2E] text-[#442C2E] rounded-lg disabled:opacity-50 hover:bg-lime-200 transition duration-300"
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
                                ? 'bg-[#442C2E] text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-lime-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-[#442C2E] text-[#442C2E] rounded-lg disabled:opacity-50 hover:bg-lime-200 transition duration-300"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default AboutUsSection;