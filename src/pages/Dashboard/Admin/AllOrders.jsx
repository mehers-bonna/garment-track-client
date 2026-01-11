import React, { useState } from 'react';
import AllOrdersDataRow from '../../../components/Dashboard/TableRows/AllOrdersDataRow';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllOrders = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const axiosSecure = useAxiosSecure();
    const {
        data: orders = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['all-orders', statusFilter],
        queryFn: async () => {
            const result = await axiosSecure.get(
                `/all-orders?status=${statusFilter}`
            );
            return result.data;
        },
    });

    if (isLoading) return <div className='flex justify-center items-center h-64'><LoadingSpinner /></div>;

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8 transition-colors duration-300 mb-12'>
                <div className='py-8'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                        <h2 className='text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-100'>
                            All Orders 🧾
                        </h2>

                        {/* Filter Dropdown */}
                        <div className='relative w-full sm:w-auto'>
                            <select
                                value={statusFilter}
                                onChange={handleFilterChange}
                                className='w-full p-2 border border-gray-300 dark:border-gray-700 focus:outline-lime-500 rounded-md text-gray-900 dark:text-gray-200 bg-white dark:bg-[#1a1a1a] transition-colors'
                            >
                                <option value='' className='dark:bg-[#1a1a1a]'>Filter by Status (All)</option>
                                <option value='Pending' className='dark:bg-[#1a1a1a]'>Pending</option>
                                <option value='Approved' className='dark:bg-[#1a1a1a]'>Approved</option>
                                <option value='Rejected' className='dark:bg-[#1a1a1a]'>Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden border dark:border-gray-800 transition-colors'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr className='hidden md:table-row'>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Order ID</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>User (Buyer)</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Product</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Quantity</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Status</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className='px-5 py-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm text-center text-gray-500 dark:text-gray-400 font-medium'>
                                                No orders found in the database{statusFilter ? ` with status: ${statusFilter}` : '.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map(order => (
                                            <AllOrdersDataRow
                                                key={order._id}
                                                order={order}
                                                refetch={refetch}
                                            />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllOrders;