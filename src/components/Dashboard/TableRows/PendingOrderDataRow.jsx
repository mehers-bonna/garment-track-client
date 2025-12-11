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
            <tr className='border-b border-gray-200 bg-white md:table-row block mb-4 md:mb-0 shadow md:shadow-none'>

                {/* Order Id */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
                    <span className="md:hidden font-bold block text-xs text-gray-500">Order Id:</span>
                    <p className='text-gray-900 text-center'>{_id}</p>
                </td>

                {/*  User */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left '>
                    <span className="md:hidden font-bold block text-xs text-gray-500">User:</span>
                    <p className='text-gray-900 text-center'>{buyer}</p>
                </td>

                {/* Product */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
                    <span className="md:hidden font-bold block text-xs text-gray-500">Product:</span>
                    <p className='text-gray-900 text-center'>{name}</p>
                </td>

                {/* Quantity */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
                    <span className="md:hidden font-bold block text-xs text-gray-500">Quantity:</span>
                    <p className='text-gray-900 text-center'>{orderQuantity}</p>
                </td>

                {/* Order Date */}
                <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
                    <span className="md:hidden font-bold block text-xs text-gray-500">Order Date:</span>
                    <p className='text-gray-900 text-center'>{orderDate}</p>
                </td>

                {/* Action Buttons */}
                <td className='px-5 py-3 md:py-5 border-b-0 bg-white text-sm block md:table-cell'>
                    <span className="md:hidden font-bold block text-xs text-gray-500">Action:</span>
                    <div className='flex gap-2 justify-center items-center'>
                        {/* Approve Button */}
                        <button
                            onClick={() => handleStatusUpdate('Approved')}
                            disabled={status !== 'Pending'}
                            className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full ${status === 'Pending'
                                    ? 'text-green-900 bg-green-200 hover:bg-green-300 transition'
                                    : 'text-gray-500 bg-gray-100'
                                }`}
                        >
                            <span className='relative'>Approve</span>
                        </button>

                        {/* Reject Button */}
                        <button
                            onClick={() => handleStatusUpdate('Rejected')}
                            disabled={status !== 'Pending'}
                            className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full ${status === 'Pending'
                                    ? 'text-red-900 bg-red-200 hover:bg-red-300 transition'
                                    : 'text-gray-500 bg-gray-100'
                                }`}
                        >
                            <span className='relative'>Reject</span>
                        </button>

                        {/* View Button */}
                        <button
                            onClick={handleViewDetails}
                            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight rounded-full bg-blue-200 hover:bg-blue-300 transition'
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