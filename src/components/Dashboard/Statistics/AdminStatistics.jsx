import React from 'react'
import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

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
      <h4 className='block antialiased tracking-normal font-sans text-2xl font-extrabold text-gray-900 dark:text-white'>
        {value}
      </h4>
    </div>
    <div className={`h-2 ${gradientClass}`}></div>
  </div>
);

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAdminStats = async () => {
    const response = await axiosSecure.get(`/stats/admin`);
    return response.data;
  };

  const {
    data: stats = {},
    isLoading,
    isError
  } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  });

  if (isLoading) {
    return <div className='flex justify-center items-center h-64'><LoadingSpinner /></div>;
  }

  if (isError) {
    return <div className='text-center py-8 text-xl text-red-600 font-bold'>Error loading statistics.</div>;
  }

  const {
    totalOrders = 0,
    totalProducts = 0,
    totalUsers = 0,
    totalSales = 0,
    chartData = []
  } = stats;

  const summaryChartData = [
    { name: 'Orders', count: totalOrders, amount: totalOrders },
    { name: 'Products', count: totalProducts, amount: totalProducts },
    { name: 'Users', count: totalUsers, amount: totalUsers },
  ];

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
    <div className='p-4 transition-colors duration-300'>
      <div className='mt-8'>
        {/* small cards */}
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
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2'>
          
          {/* Sales Analytics (Bar Chart) - Show dynamic data summary */}
          <div className='bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md border dark:border-gray-800 transition-colors'>
            <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-gray-100'>Orders & Inventory (Bar)</h2>
            <div className='h-[350px] w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summaryChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Growth (Area Chart) - Dynamic chart based on sales history */}
          <div className='bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md border dark:border-gray-800 transition-colors'>
            <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-gray-100'>Sales Trend (Area)</h2>
            <div className='h-[350px] w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.length > 0 ? chartData : [{date: 'Total Sales', sales: totalSales}]}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                  <XAxis dataKey={chartData.length > 0 ? "date" : "date"} stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Area type="monotone" dataKey="sales" stroke="#ef4444" fillOpacity={1} fill="url(#colorSales)" name="Sales Amount" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminStatistics