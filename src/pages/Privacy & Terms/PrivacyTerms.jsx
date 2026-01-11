import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaFileContract, FaUserLock } from 'react-icons/fa';

const PrivacyTermsSection = () => {
    const [activeTab, setActiveTab] = useState('privacy');

    const content = {
        privacy: {
            title: "Privacy Policy",
            icon: <FaShieldAlt />,
            text: "At GarmentTrack, we take your data security seriously. We collect information to provide better services to all our users. We ensure that your production data and personal information are encrypted and never shared with unauthorized third parties."
        },
        terms: {
            title: "Terms of Service",
            icon: <FaFileContract />,
            text: "By using GarmentTrack, you agree to comply with our production standards and reporting guidelines. Misuse of the platform or providing false production data may lead to account suspension. All rights to the software remain with GarmentTrack."
        }
    };

    return (
        /* Section background and transition added */
        <section className="min-h-screen w-full bg-white dark:bg-[#0f0f0f] transition-colors duration-300 py-24">
            <div className="w-11/12 md:w-8/12 mx-auto flex flex-col items-center">
                
                {/* Tab Buttons Container */}
                <div className="flex gap-4 p-2 bg-gray-100 dark:bg-[#1a1a1a] rounded-full mb-12 border dark:border-gray-800 transition-colors">
                    <button 
                        onClick={() => setActiveTab('privacy')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                            activeTab === 'privacy' 
                            ? 'bg-[#442C2E] text-white shadow-lg' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-[#442C2E] dark:hover:text-[#FEEAE6]'
                        }`}
                    >
                        Privacy Policy
                    </button>
                    <button 
                        onClick={() => setActiveTab('terms')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                            activeTab === 'terms' 
                            ? 'bg-[#442C2E] text-white shadow-lg' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-[#442C2E] dark:hover:text-[#FEEAE6]'
                        }`}
                    >
                        Terms of Service
                    </button>
                </div>

                {/* Content Card */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-[#1a1a1a] p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col md:flex-row gap-10 items-center transition-colors"
                >
                    {/* Icon - Color slightly adjusted for better visibility on dark */}
                    <div className="text-7xl text-lime-500 dark:text-lime-400">
                        {content[activeTab].icon}
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-[#442C2E] dark:text-[#FEEAE6]">
                            {content[activeTab].title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed italic">
                            "{content[activeTab].text}"
                        </p>
                        
                        {/* Meta info */}
                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 font-medium">
                            <FaUserLock /> Last Updated: October 2023
                        </div>
                    </div>
                </motion.div>

                {/* Footer Text */}
                <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                    If you have any questions about these policies, please contact our legal team at <span className="underline cursor-pointer hover:text-[#442C2E] dark:hover:text-[#FEEAE6]">legal@garmenttrack.com</span>
                </div>
            </div>
        </section>
    );
};

export default PrivacyTermsSection;