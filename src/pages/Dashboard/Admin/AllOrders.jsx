import React, { useState } from 'react'; // ✅ useState import kora holo
import AllOrdersDataRow from '../../../components/Dashboard/TableRows/AllOrdersDataRow';
import { useQuery } from '@tanstack/react-query'; // ✅ useQuery import kora holo
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'; // ✅ LoadingSpinner import kora holo

const AllOrders = () => {
    // ✅ 1. State for Filtering
    const [statusFilter, setStatusFilter] = useState(''); // Default: Shob order (empty string)

    // ✅ 2. Data Fetching with useQuery and Dynamic Key
    const { 
        data: orders = [], 
        isLoading, 
        refetch 
    } = useQuery({
        queryKey: ['all-orders', statusFilter], // statusFilter change holei data refetch hobe
        queryFn: async () => {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/all-orders?status=${statusFilter}` // Dynamic API call
            );
            return result.data;
        },
    });

    // 3. Loading State
    if (isLoading) return <LoadingSpinner />;

    // 4. Handle Filter Change
    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-2xl font-semibold leading-tight'>All Orders 🧾</h2>

                        {/* ✅ Filter Dropdown UI */}
                        <div className='relative'>
                            <select
                                value={statusFilter}
                                onChange={handleFilterChange}
                                className='p-2 border border-gray-300 focus:outline-lime-500 rounded-md text-gray-900 bg-white'
                            >
                                <option value=''>Filter by Status (All)</option>
                                <option value='Pending'>Pending</option>
                                <option value='Approved'>Approved</option>
                                <option value='Rejected'>Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        {/* Table Headers */}
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Order ID</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>User (Buyer)</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Product</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Quantity</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Status</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ✅ Map orders and pass props */}
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
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