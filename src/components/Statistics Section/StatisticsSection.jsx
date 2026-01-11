import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBoxOpen, FaGlobe, FaAward } from 'react-icons/fa';

const stats = [
    { id: 1, icon: FaUsers, label: "Active Users", value: "50k+" },
    { id: 2, icon: FaBoxOpen, label: "Orders Tracked", value: "1.2M+" },
    { id: 3, icon: FaGlobe, label: "Countries", value: "25+" },
    { id: 4, icon: FaAward, label: "Success Rate", value: "99.9%" },
];

const StatisticsSection = () => {
    return (
        <section className="w-9/12 mx-auto py-12 bg-[#442C2E] dark:bg-[#1a1a1a] rounded-[40px] shadow-2xl -mt-8 relative z-20 border-4 border-white dark:border-gray-800 transition-colors">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                {stats.map((stat) => (
                    <motion.div 
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                        className="text-center"
                    >
                        <stat.icon className="text-3xl md:text-4xl text-[#D6A99D] dark:text-lime-400 mx-auto mb-3" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-[#FEEAE6] dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatisticsSection;