import React from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CancelOrderModal = ({ order, isOpen, closeModal, refetchOrders }) => {
    const axiosSecure = useAxiosSecure();
    if (!isOpen || !order) return null;

    const handleCancel = async () => {
        try {
            const { data } = await axiosSecure.put(
                `/order-status/${order._id}`,
                { status: 'Canceled' }
            );

            if (data.modifiedCount > 0) {
                toast.success(`Order ${order.name} canceled successfully!`);
                refetchOrders();
                closeModal();
            } else {
                toast.error('Failed to cancel order.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while canceling the order.');
        }
    };

    return (
        <div className="fixed inset-0 z-[110] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            <div className="flex justify-center items-center w-full h-full p-4">
                
                <div className="bg-white dark:bg-[#1a1a1a] rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-sm w-full mx-auto z-[111] border dark:border-gray-800 transition-colors duration-300">
                    
                    {/* Header */}
                    <div className="bg-white dark:bg-[#1a1a1a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">Confirm Cancellation</h2>
                        <p className="text-gray-700 dark:text-gray-300">Are you sure you want to cancel the order **{order.name}**?</p>
                        <p className="text-sm text-red-500 dark:text-red-400 mt-2">This action cannot be undone.</p>
                    </div>
                    
                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-[#0f0f0f] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-300">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                            onClick={handleCancel}
                        >
                            Confirm Cancel
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-[#2a2a2a] text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3a3a3a] focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                            onClick={closeModal}
                        >
                            No, Keep Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderModal;