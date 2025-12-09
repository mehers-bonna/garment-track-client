// PendingOrderDataRow.jsx (UPDATED CODE)
import React, { useState } from 'react'; // 🌟 useState import kora holo
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ViewOrderModal from './../../Modal/ViewOrderModal';

const PendingOrderDataRow = ({ order, refetch }) => {
    // 🌟 Modal State
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    
    // Status update mutation hook... (no change here)
    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
            // Update API call
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/order-status/${id}`,
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

    // Handle Approve/Reject click... (no change here)
    const handleStatusUpdate = async (status) => {
        try {
            await mutateAsync({ id: order._id, status });
        } catch (err) {
            console.error(err);
        }
    };
    
    // Order data destructuring... (no change here)
    const { _id, buyer, name, availableQuantity, status } = order;

    // 🌟 View button functionality (Ekhon Modal open korbe)
    const handleViewDetails = () => {
        openModal(); // Modal open kora holo
    };
    
    // Date formatting... (no change here)
    const orderDate = new Date().toLocaleDateString('en-US'); // Placeholder

    return (
        <>
            {/* 🌟 View Order Modal component */}
            <ViewOrderModal
                isOpen={isOpen}
                closeModal={closeModal}
                order={order} // Full order object pass kora holo
            />

            <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900'>{_id.slice(-6)}</p> {/* Last 6 digits of ID as Order ID */}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900'>{buyer}</p> {/* Buyer Email as User */}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900'>{name}</p> {/* Product Name */}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900'>{availableQuantity}</p> {/* Quantity */}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900'>{orderDate}</p> {/* Order Date */}
                </td>

                {/* Action Buttons */}
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex gap-2 items-center'>
                        {/* Approve Button */}
                        <button
                            onClick={() => handleStatusUpdate('Approved')}
                            disabled={status !== 'Pending'} 
                            className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                                status === 'Pending' 
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
                             className={`relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                                status === 'Pending' 
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