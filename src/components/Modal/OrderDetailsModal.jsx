import React from 'react';

const OrderDetailsModal = ({ order, isOpen, closeModal }) => {
    if (!isOpen) return null;
    const trackingHistory = order.tracking || [{
        status: 'Order Placed',
        location: 'N/A',
        timestamp: new Date(order.timestamp || Date.now()).toISOString(),
        notes: 'Initial Order Placement'
    }];
    const sortedTracking = trackingHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
            
            <div className="flex justify-center items-center w-full min-h-full p-4">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-lg text-left overflow-hidden shadow-2xl transform transition-all max-w-4xl w-full mx-auto my-8 z-[101] border dark:border-gray-800">
                    <div className="bg-white dark:bg-[#1a1a1a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100 border-b dark:border-gray-800 pb-2 mb-4" id="modal-title">
                                    Order Details: <span className='text-lime-600 dark:text-lime-400'>{order.transactionId?.slice(0, 10) || order._id}</span>
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Order Info */}
                                    <div className='text-gray-700 dark:text-gray-300'>
                                        <h4 className='text-lg font-semibold mb-2 text-lime-700 dark:text-lime-500'>Summary</h4>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Order ID:</strong> {order._id}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Transaction ID:</strong> {order.transactionId}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Status:</strong> 
                                            <span className={`ml-2 font-bold ${order.status === 'Approved' ? 'text-green-600' : order.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                {order.status}
                                            </span>
                                        </p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Quantity:</strong> {order.availableQuantity}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Total Price:</strong> ${order.price}</p>
                                    </div>
                                    
                                    {/* Product & User Info */}
                                    <div className='text-gray-700 dark:text-gray-300'>
                                        <h4 className='text-lg font-semibold mb-2 text-lime-700 dark:text-lime-500'>Product & Buyer</h4>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Product Name:</strong> {order.name}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Category:</strong> {order.category}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Buyer Email:</strong> {order.buyer}</p>
                                        <p><strong className='text-gray-900 dark:text-gray-100'>Manager:</strong> {order.manager?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                {/* Tracking History */}
                                <div>
                                    <h4 className='text-lg font-semibold mb-3 border-t dark:border-gray-800 pt-3 text-lime-700 dark:text-lime-500'>Tracking History</h4>
                                    
                                    {sortedTracking.length === 0 ? (
                                        <p className="text-gray-500 dark:text-gray-400">No tracking history available.</p>
                                    ) : (
                                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {sortedTracking.map((track, index) => (
                                                <div key={index} className="border-l-4 border-lime-500 pl-4 py-2 bg-gray-50 dark:bg-[#262626] rounded-md shadow-sm">
                                                    <p className='font-semibold text-gray-800 dark:text-gray-100'>{track.status}</p>
                                                    <p className='text-sm text-gray-600 dark:text-gray-400'>Location: {track.location || 'Unknown'}</p>
                                                    <p className='text-xs text-gray-500 dark:text-gray-500'>Time: {new Date(track.timestamp).toLocaleString()}</p>
                                                    {track.notes && <p className='text-xs text-gray-500 dark:text-gray-400 italic mt-1'>Notes: {track.notes}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Modal Footer */}
                    <div className="bg-gray-50 dark:bg-[#222] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t dark:border-gray-800">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-[#333] text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#444] focus:outline-none sm:w-auto sm:text-sm transition-colors"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;