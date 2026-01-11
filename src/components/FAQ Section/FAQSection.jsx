import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    { question: "How real-time is the tracking?", answer: "Our system syncs every 30 seconds across all production floors to provide near-instant updates." },
    { question: "Can I integrate my existing ERP?", answer: "Yes, GarmentTrack supports API integrations with major ERP and inventory management tools." },
    { question: "Is my data secure?", answer: "We use enterprise-grade encryption and secure cloud servers to ensure your data remains confidential." }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="w-9/12 mx-auto py-16 -mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#442C2E] dark:text-[#FEEAE6]">
                Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border dark:border-gray-800 overflow-hidden shadow-sm">
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex justify-between items-center p-6 text-left hover:bg-lime-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="font-bold text-[#442C2E] dark:text-gray-200">{faq.question}</span>
                            <FaChevronDown className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 text-gray-600 dark:text-gray-400"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;