import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { id: 1, title: "Outerwear", items: "120+ Products", color: "bg-blue-100 dark:bg-blue-900/30" },
    { id: 2, title: "Formal Wear", items: "85+ Products", color: "bg-orange-100 dark:bg-orange-900/30" },
    { id: 3, title: "Accessories", items: "200+ Products", color: "bg-lime-100 dark:bg-lime-900/30" },
    { id: 4, title: "Activewear", items: "50+ Products", color: "bg-purple-100 dark:bg-purple-900/30" },
];

const CategoriesSection = () => {
    return (
        <section className="w-9/12 mx-auto py-16 -mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#442C2E] dark:text-[#FEEAE6]">
                Explore Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className={`${cat.color} p-8 rounded-3xl cursor-pointer border border-transparent hover:border-[#442C2E] dark:hover:border-lime-500 transition-all duration-300 shadow-sm text-center`}
                    >
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{cat.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">{cat.items}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;