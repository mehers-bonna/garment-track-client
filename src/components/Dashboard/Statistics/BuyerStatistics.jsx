import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from './../../Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass }) => (
    <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-[#1a1a1a] shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border-t-4 ${colorClass}`}>
        <div className='flex justify-between items-center p-6'>
            <div className='flex items-center space-x-3'>
                <div className='text-xl text-gray-500 dark:text-gray-400'>
                    <Icon className='w-6 h-6' />
                </div>
                <p className='block antialiased font-sans text-lg font-medium text-gray-600 dark:text-gray-300'>
                    {title}
                </p>
            </div>
            <h4 className='block antialiased tracking-normal font-sans text-4xl font-extrabold text-gray-900 dark:text-[#FEEAE6]'>
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
        return <div className='flex justify-center items-center py-20'><LoadingSpinner /></div>;
    }

    if (isError) {
        return <div className='text-center py-8 text-xl text-red-600 font-bold'>Error loading statistics.</div>;
    }

    const {
        totalOrders = 0,
        pendingOrders = 0,
        approvedOrders = 0,
        totalSpending = 0
    } = stats;

    const formattedSpending = `$${totalSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Data for Charts
    const orderData = [
        { name: 'Pending', value: pendingOrders },
        { name: 'Approved', value: approvedOrders },
    ];

    const chartData = [
        { name: 'Total Orders', count: totalOrders },
        { name: 'Pending', count: pendingOrders },
        { name: 'Approved', count: approvedOrders },
    ];

    const COLORS = ['#f59e0b', '#10b981'];

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
        <div className="p-4 md:p-8 transition-colors duration-300">
            {/* Stat Cards Grid */}
            <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4'>
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

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Bar Chart */}
                <div className='bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors'>
                    <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-[#FEEAE6]'>Order Comparison</h2>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#888888" vertical={false} opacity={0.1}/>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    cursor={{fill: 'transparent'}}
                                />
                                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className='bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors'>
                    <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-[#FEEAE6]'>Order Status Distribution</h2>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BuyerStatistics;