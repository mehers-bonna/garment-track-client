import React from 'react'
import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from './../../Shared/LoadingSpinner';

const fetchAdminStats = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/stats/admin`);
  return response.data;
};

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
);


const AdminStatistics = () => {
  const {
    data: stats = {},
    isLoading,
    isError
  } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  });

  if (isLoading) {
    return <div className='text-center py-8 text-xl'><LoadingSpinner /></div>;
  }

  if (isError) {
    return <div className='text-center py-8 text-xl text-red-600'>Error loading statistics.</div>;
  }

  const {
    totalOrders = 0,
    totalProducts = 0,
    totalUsers = 0,
    totalSales = 0
  } = stats;

  const formattedSales = `$${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const cardData = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: BsFillCartPlusFill,
      colorClass: 'border-blue-500',
      gradientClass: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: BsFillHouseDoorFill,
      colorClass: 'border-green-500',
      gradientClass: 'bg-gradient-to-r from-green-500 to-lime-500'
    },
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: FaUserAlt,
      colorClass: 'border-indigo-500',
      gradientClass: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
    {
      title: "Total Sales",
      value: formattedSales,
      icon: FaDollarSign,
      colorClass: 'border-red-500',
      gradientClass: 'bg-gradient-to-r from-red-500 to-orange-500'
    },
  ];

  return (
    <div>
      <div className='mt-12'>
        {/* small cards */}
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

        {/* Chart and Calendar Sections */}
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/*Sales Bar Chart */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
          </div>
          {/* Calender */}
          <div className=' relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics