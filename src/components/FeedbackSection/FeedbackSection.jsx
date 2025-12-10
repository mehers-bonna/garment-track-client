import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import boyImage from '../../assets/boy.png';
import girlImage from '../../assets/girl.jpg';

const testimonials = [
    {
        id: 1,
        quote: "GarmentTrack's real-time tracking has completely revolutionized our production cycle. Every step, from floor operations to final shipment, is now visible, enabling swift and data-driven decisions.",
        name: "David Chen",
        title: "Head of Logistics, Global Wear Inc.",
        image: boyImage
    },
    {
        id: 2,
        quote: "We can accurately monitor every step, from order placement to delivery of finished dresses and accessories. Manual errors are virtually zero! GarmentTrack is essential to our business success.",
        name: "Maria Sanchez",
        title: "Supply Chain Manager, StyleNova",
        image: girlImage
    },
    {
        id: 3,
        quote: "For managing finished goods inventory and tracking accessory usage, GarmentTrack is the best. We track stock levels and utilization with an ease we never had before, saving both time and cost.",
        name: "Omar Hassan",
        title: "Production Director, Horizon Textiles",
        image: boyImage
    }
];

const FeedbackSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1)
        );
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-16 md:py-24 bg-lime-50 rounded-3xl">
            <div className="w-9/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
                        What Our Clients Say
                    </h2>
                    <p className="mt-4 text-md text-gray-600 max-w-2xl mx-auto">
                        Discover how GarmentTrack helped global partners optimize production and logistics.
                    </p>
                </div>
                <div className="relative max-w-2xl mx-auto">
                    <div className="w-full p-6 md:p-10 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-500 ease-in-out">
                        
                        <FaQuoteLeft className="w-8 h-8 text-lime-500 mb-6 opacity-75" />
                        
                        <blockquote key={currentTestimonial.id} className="text-xl md:text-2xl font-medium text-gray-800 italic animate-fadeIn">
                            {currentTestimonial.quote}
                        </blockquote>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center">
                            <img 
                                className="w-16 h-16 rounded-full object-cover shadow-md" 
                                src={currentTestimonial.image} 
                                alt={currentTestimonial.name}
                                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/64"}} 
                            />
                            <div className="ml-4">
                                <p className="text-xl font-bold text-gray-900">{currentTestimonial.name}</p>
                                <p className="text-base text-lime-600 font-medium">{currentTestimonial.title}</p>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={prevSlide}
                        className="absolute inset-y-0 left-0 my-auto p-3 ml-[-1rem] md:ml-[-2rem] bg-white rounded-full shadow-lg hover:bg-lime-200 hover:text-white text-gray-700 focus:outline-none transition duration-150"
                        aria-label="Previous Testimonial"
                    >
                        <FaChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={nextSlide}
                        className="absolute inset-y-0 right-0 my-auto p-3 mr-[-1rem] md:mr-[-2rem] bg-white rounded-full shadow-lg hover:bg-lime-200 hover:text-white text-gray-700 focus:outline-none transition duration-150"
                        aria-label="Next Testimonial"
                    >
                        <FaChevronRight className="w-5 h-5" />
                    </button>
                    
                </div>
                <div className="flex justify-center mt-12 space-x-3">
                    {testimonials.map((_, index) => (
                        <span 
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
                                index === currentIndex ? 'bg-lime-600 shadow-md' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></span>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeedbackSection;