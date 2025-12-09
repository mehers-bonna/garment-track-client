// File: ../../../components/Dashboard/Modal/OrderDetailsModal.jsx

import React from 'react';

const OrderDetailsModal = ({ order, isOpen, closeModal }) => {
    if (!isOpen) return null;

    // Default tracking array jodi kono tracking data na thake
    const trackingHistory = order.tracking || [{
        status: 'Order Placed',
        location: 'N/A',
        timestamp: new Date(order.timestamp || Date.now()).toISOString(),
        notes: 'Initial Order Placement'
    }];
    
    // Sort tracking history by timestamp descending (latest first)
    const sortedTracking = trackingHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


    return (
        // ✅ 1. Outer container: bg-gray-900 bg-opacity-50 রিমুভ করে দেওয়া হলো।
        // ব্যাকগ্রাউন্ড ট্র্যান্সপারেন্ট হবে, কিন্তু Modal টি সবার উপরে z-[100] এ থাকবে।
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            
            {/* ✅ Background overlay - Simple Click Handler: 
               fixed inset-0 ক্লাসটি রাখা হলো যাতে Modal-এর বাইরে ক্লিক করলে closeModal() কাজ করে, 
               কিন্তু কোনো ব্যাকগ্রাউন্ড কালার/অপাসিটি নেই, ফলে পিছনের কন্টেন্ট দেখা যাবে। */}
            <div className="fixed inset-0" aria-hidden="true" onClick={closeModal}></div>

            {/* 2. Modal Centering Container (This holds the actual modal content) */}
            <div className="flex justify-center items-center w-full h-full p-4">

                {/* 3. Modal Panel (Actual Content Box) */}
                <div className="bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all max-w-4xl w-full mx-auto my-8 z-[101]">
                    
                    {/* Modal Header and Content Area */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl leading-6 font-bold text-gray-900 border-b pb-2 mb-4" id="modal-title">
                                    Order Details: {order.transactionId?.slice(0, 10) || order._id}
                                </h3>
                                
                                {/* 1. Order Summary and Buyer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {/* Column 1: Order Info */}
                                    <div>
                                        <h4 className='text-lg font-semibold mb-2 text-lime-700'>Summary</h4>
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                        <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                                        <p><strong>Status:</strong> <span className={`font-bold ${order.status === 'Approved' ? 'text-green-600' : order.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                                        <p><strong>Quantity:</strong> {order.availableQuantity}</p>
                                        <p><strong>Total Price:</strong> ${order.price}</p>
                                    </div>
                                    
                                    {/* Column 2: Product & User Info */}
                                    <div>
                                        <h4 className='text-lg font-semibold mb-2 text-lime-700'>Product & Buyer</h4>
                                        <p><strong>Product Name:</strong> {order.name}</p>
                                        <p><strong>Category:</strong> {order.category}</p>
                                        <p><strong>Buyer Email:</strong> {order.buyer}</p>
                                        <p><strong>Manager:</strong> {order.manager?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                {/* 2. Tracking History */}
                                <div>
                                    <h4 className='text-lg font-semibold mb-3 border-t pt-3 text-lime-700'>Tracking History</h4>
                                    
                                    {sortedTracking.length === 0 ? (
                                        <p className="text-gray-500">No tracking history available.</p>
                                    ) : (
                                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                            {sortedTracking.map((track, index) => (
                                                <div key={index} className="border-l-4 border-lime-500 pl-4 py-2 bg-gray-50 rounded-md shadow-sm">
                                                    <p className='font-semibold text-gray-800'>{track.status}</p>
                                                    <p className='text-sm text-gray-600'>Location: {track.location || 'Unknown'}</p>
                                                    <p className='text-xs text-gray-500'>Time: {new Date(track.timestamp).toLocaleString()}</p>
                                                    {track.notes && <p className='text-xs text-gray-500 italic'>Notes: {track.notes}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    
                    {/* Modal Footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none sm:w-auto sm:text-sm"
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