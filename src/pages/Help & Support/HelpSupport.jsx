import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaHeadset, FaBookOpen, FaChevronDown, FaGlobe } from 'react-icons/fa';

const faqs = [
    {
        question: "How do I track my order status?",
        answer: "Go to your dashboard and select 'My Orders'. You can see the real-time status from cutting to shipping."
    },
    {
        question: "Can I change my delivery address?",
        answer: "Yes, you can update your profile details or contact your manager before the order reaches the shipping stage."
    },
    {
        question: "How do I contact my assigned manager?",
        answer: "Every order has a designated manager. You can find their contact details in the order details page."
    }
];

const HelpSupportSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const infoCards = [
        { 
            icon: FaHeadset, 
            title: "Direct Support", 
            detail: "support@garmenttrack.com",
            subDetail: "Available: 9AM - 6PM"
        },
        { 
            icon: FaBookOpen, 
            title: "User Guide", 
            detail: "Download PDF Guide",
            subDetail: "Version 2.0"
        },
        { 
            icon: FaGlobe, 
            title: "Global Office", 
            detail: "Dhaka, Bangladesh",
            subDetail: "Garments Hub, Sector 7"
        },
    ];

    return (
        /* Added transition and dark background support */
        <section className="min-h-screen w-full bg-white dark:bg-[#0f0f0f] transition-colors duration-300 py-24 mb-10">
            <div className="w-10/12 mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-[#442C2E] dark:text-[#FEEAE6] mb-4">Help & Support Center</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Quick info and answers to help you navigate GarmentTrack efficiently.</p>
                </motion.div>

                {/* Static Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {infoCards.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-lime-50 dark:bg-[#1a1a1a] p-8 rounded-3xl text-center border border-lime-100 dark:border-gray-800 shadow-sm transition-colors"
                        >
                            <div className="bg-white dark:bg-[#2a2a2a] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transition-colors">
                                <item.icon className="text-3xl text-[#442C2E] dark:text-[#FEEAE6]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#442C2E] dark:text-[#FEEAE6]">{item.title}</h3>
                            <p className="text-[#442C2E] dark:text-gray-200 font-medium">{item.detail}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.subDetail}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl transition-colors">
                    <div className="flex items-center gap-3 mb-8">
                        <FaQuestionCircle className="text-3xl text-[#442C2E] dark:text-[#FEEAE6]" />
                        <h3 className="text-2xl font-bold text-[#442C2E] dark:text-[#FEEAE6]">Quick Solutions</h3>
                    </div>
                    
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                            <button 
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full flex justify-between items-center p-5 rounded-2xl text-left font-semibold transition-all duration-300 ${
                                    activeIndex === index 
                                    ? 'bg-lime-100 dark:bg-gray-800 text-[#442C2E] dark:text-[#FEEAE6]' 
                                    : 'bg-gray-50 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {faq.question}
                                <FaChevronDown className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#442C2E] dark:text-[#FEEAE6]' : 'text-gray-400'}`} />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 text-gray-600 dark:text-gray-400 leading-relaxed border-l-2 border-lime-300 dark:border-lime-500 ml-5 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HelpSupportSection;