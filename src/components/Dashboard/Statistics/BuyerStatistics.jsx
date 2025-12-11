import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth'; 
import LoadingSpinner from './../../Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass }) => (
    <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border-t-4 ${colorClass}`}>
        <div className='flex justify-between items-center p-6'>
            <div className='flex items-center space-x-3'>
                <div className='text-xl text-gray-500'>
                    <Icon className='w-6 h-6' />
                </div>
                <p className='block antialiased font-sans text-lg font-medium text-gray-600'>
                    {title}
                </p>
            </div>
            <h4 className='block antialiased tracking-normal font-sans text-4xl font-extrabold text-gray-900'>
                {value}
            </h4>
        </div>
        <div className={`h-2 ${gradientClass}`}></div>
    </div>
)

const BuyerStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const fetchBuyerStats = async (email) => {
    if (!email) return {};
    const response = await axiosSecure.get(`/stats/buyer/${email}`); 
    return response.data;
};

    const buyerEmail = user?.email; 
    const { 
        data: stats = {}, 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['buyer-stats', buyerEmail],
        queryFn: () => fetchBuyerStats(buyerEmail),
        enabled: !!buyerEmail, 
    });

    if (isLoading || !buyerEmail) {
        return <div className='text-center py-8 text-xl'><LoadingSpinner /></div>;
    }

    if (isError) {
        return <div className='text-center py-8 text-xl text-red-600'>Error loading statistics.</div>;
    }
    
    const {
        totalOrders = 0,
        pendingOrders = 0,
        approvedOrders = 0,
        totalSpending = 0 
    } = stats;
    const formattedSpending = `$${totalSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const cardData = [
        {
            title: "Total Orders",
            value: totalOrders.toLocaleString(),
            icon: BsFillCartCheckFill,
            colorClass: 'border-blue-500',
            gradientClass: 'bg-gradient-to-r from-blue-500 to-cyan-500'
        },
        {
            title: "Pending Orders",
            value: pendingOrders.toLocaleString(),
            icon: FaHourglassHalf,
            colorClass: 'border-yellow-500',
            gradientClass: 'bg-gradient-to-r from-yellow-500 to-orange-500'
        },
        {
            title: "Approved Orders",
            value: approvedOrders.toLocaleString(),
            icon: FaCheckCircle,
            colorClass: 'border-green-500',
            gradientClass: 'bg-gradient-to-r from-green-500 to-lime-500'
        },
        {
            title: "Total Spent",
            value: formattedSpending,
            icon: FaDollarSign,
            colorClass: 'border-indigo-500',
            gradientClass: 'bg-gradient-to-r from-indigo-500 to-purple-500'
        },
    ];

    return (
        <div>
            <div className='mt-12'>
                <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {/* StatCard */}
                    {cardData.map((data, index) => (
                        <StatCard 
                            key={index} 
                            title={data.title}
                            value={data.value}
                            icon={data.icon}
                            colorClass={data.colorClass}
                            gradientClass={data.gradientClass}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default BuyerStatistics;