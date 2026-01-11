import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ViewOrderModal from './../../Modal/ViewOrderModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PendingOrderDataRow = ({ order, refetch }) => {
    // Modal State
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
            const { data } = await axiosSecure.put(
                `/order-status/${id}`,
                { status }
            );
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success(`Order ${variables.status} Successfully!`);
            refetch();
        },
        onError: (error) => {
            toast.error(`Operation failed: ${error.message}`);
        }
    });
    const handleStatusUpdate = async (status) => {
        try {
            await mutateAsync({ id: order._id, status });
        } catch (err) {
            console.error(err);
        }
    };

    const { _id, buyer, name, orderQuantity, status } = order;

    const handleViewDetails = () => {
        openModal();
    };

    const orderDate = new Date().toLocaleDateString('en-US');

    return (
        <>
            <ViewOrderModal
                isOpen={isOpen}
                closeModal={closeModal}
                order={order}
            />
            <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-300'>

                {/* Order Id */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Order Id:</span>
                    <p className='text-gray-900 dark:text-gray-200 text-center'>{_id}</p>
                </td>

                {/* User */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">User:</span>
                    <p className='text-gray-900 dark:text-gray-200 text-center'>{buyer}</p>
                </td>

                {/* Product */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Product:</span>
                    <p className='text-gray-900 dark:text-gray-200 text-center'>{name}</p>
                </td>

                {/* Quantity */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Quantity:</span>
                    <p className='text-gray-900 dark:text-gray-200 text-center'>{orderQuantity}</p>
                </td>

                {/* Order Date */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Order Date:</span>
                    <p className='text-gray-900 dark:text-gray-200 text-center'>{orderDate}</p>
                </td>

                {/* Action Buttons */}
                <td className='px-5 py-3 md:py-5 border-b-0 md:border-b-0 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell transition-colors duration-300'>
                    <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Action:</span>
                    <div className='flex gap-2 justify-center items-center'>
                        {/* Approve Button */}
                        <button
                            onClick={() => handleStatusUpdate('Approved')}
                            disabled={status !== 'Pending'}
                            className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full transition-all duration-200 ${status === 'Pending'
                                    ? 'text-green-900 dark:text-green-100 bg-green-200 dark:bg-green-800/60 hover:bg-green-300 dark:hover:bg-green-700'
                                    : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/40'
                                }`}
                        >
                            <span className='relative'>Approve</span>
                        </button>

                        {/* Reject Button */}
                        <button
                            onClick={() => handleStatusUpdate('Rejected')}
                            disabled={status !== 'Pending'}
                            className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full transition-all duration-200 ${status === 'Pending'
                                    ? 'text-red-900 dark:text-red-100 bg-red-200 dark:bg-red-800/60 hover:bg-red-300 dark:hover:bg-red-700'
                                    : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/40'
                                }`}
                        >
                            <span className='relative'>Reject</span>
                        </button>

                        {/* View Button */}
                        <button
                            onClick={handleViewDetails}
                            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 dark:text-blue-100 leading-tight rounded-full bg-blue-200 dark:bg-blue-800/60 hover:bg-blue-300 dark:hover:bg-blue-700 transition-all duration-200'
                        >
                            <span className='relative'>View</span>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PendingOrderDataRow;