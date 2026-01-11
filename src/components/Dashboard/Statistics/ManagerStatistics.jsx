import React from 'react'
import { FaDollarSign, FaCheckCircle } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass }) => (
  <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-[#1a1a1a] shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border-t-4 ${colorClass} transition-colors duration-300`}>
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
);

const ManagerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const managerEmail = user?.email;

  const fetchManagerStats = async (email) => {
    if (!email) return {};
    const response = await axiosSecure.get(`/stats/manager/${email}`);
    return response.data;
  };

  const {
    data: stats = {},
    isLoading,
    isError
  } = useQuery({
    queryKey: ['manager-stats', managerEmail],
    queryFn: () => fetchManagerStats(managerEmail),
    enabled: !!managerEmail,
  });

  if (isLoading || !managerEmail) {
    return <div className='text-center py-8 text-xl'><LoadingSpinner /></div>;
  }

  if (isError) {
    return <div className='text-center py-8 text-xl text-red-600 dark:text-red-400'>Error loading statistics.</div>;
  }

  const {
    totalProducts = 0,
    totalOrders = 0,
    totalApprovedOrders = 0,
    totalRevenue = 0
  } = stats;

  const formattedRevenue = `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cardData = [
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: BsFillHouseDoorFill,
      colorClass: 'border-cyan-500',
      gradientClass: 'bg-gradient-to-r from-cyan-500 to-teal-500'
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: BsFillCartPlusFill,
      colorClass: 'border-yellow-500',
      gradientClass: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      title: "Approved Orders",
      value: totalApprovedOrders.toLocaleString(),
      icon: FaCheckCircle,
      colorClass: 'border-green-500',
      gradientClass: 'bg-gradient-to-r from-green-500 to-lime-500'
    },
    {
      title: "Total Revenue",
      value: formattedRevenue,
      icon: FaDollarSign,
      colorClass: 'border-indigo-500',
      gradientClass: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
  ];

  // Chart Data Preparation
  const chartData = [
    { name: 'Products', value: totalProducts },
    { name: 'Total Orders', value: totalOrders },
    { name: 'Approved', value: totalApprovedOrders },
  ];

  const COLORS = ['#06b6d4', '#eab308', '#22c55e'];

  return (
    <div className="transition-colors duration-300">
      <div className='mt-12'>
        {/* Stat Cards Grid */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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

        {/* Chart Section */}
        <div className='mb-24'>
          <div className='bg-white dark:bg-[#1a1a1a] shadow-xl rounded-xl p-6 border dark:border-gray-800 transition-colors duration-300'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-[#FEEAE6]'>Manager Activity Overview</h2>
          <div className='w-full h-[400px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff' 
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="value" name="Total Count" radius={[4, 4, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerStatistics