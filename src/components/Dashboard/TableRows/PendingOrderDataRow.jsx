import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ViewOrderModal from './../../Modal/ViewOrderModal';

const PendingOrderDataRow = ({ order, refetch }) => {
    // Modal State
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const queryClient = useQueryClient();
    
    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
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

            <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <p className='text-gray-900'>{_id}</p> 
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <p className='text-gray-900'>{buyer}</p> 
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <p className='text-gray-900'>{name}</p> 
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <p className='text-gray-900'>{orderQuantity}</p> 
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                    <p className='text-gray-900'>{orderDate}</p> 
                </td>

                {/* Action Buttons */}
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex gap-2 items-center justify-center'>
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