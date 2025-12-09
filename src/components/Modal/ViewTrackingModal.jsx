// src/components/Dashboard/Modal/ViewTrackingModal.jsx
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React from 'react';
import { format } from 'date-fns';

const ViewTrackingModal = ({ closeModal, isOpen, order }) => {
    // Tracking updates reverse order-e dekhanor jonne (latest update shobar upore)
    const trackingHistory = order?.tracking ? [...order.tracking].reverse() : [];
    
    // Icon mapping (status onujayi icon change kora jabe)
    const getStatusIcon = (status) => {
        if (status.includes('Completed')) return '✅';
        if (status.includes('Started')) return '⚙️';
        if (status.includes('Packed')) return '📦';
        if (status.includes('Shipped')) return '🛫';
        if (status.includes('Delivery')) return '🚚';
        if (status.includes('Checked')) return '🔎';
        return '⚪';
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                {/* Backdrop Overlay (Transparent raka holo apnar demand onujayi) */}
                <TransitionChild
                    as={React.Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-transparent' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={React.Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                
                                <DialogTitle
                                    as='h3'
                                    className='text-2xl font-bold leading-6 text-gray-900 border-b pb-3 mb-6'
                                >
                                    🔍 Tracking Timeline (Order ID: {order?._id.slice(-6)})
                                </DialogTitle>

                                {trackingHistory.length === 0 ? (
                                    <p className='text-gray-500 text-center py-8'>
                                        No tracking updates found for this order.
                                    </p>
                                ) : (
                                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200 before:pointer-events-none">
                                        
                                        {trackingHistory.map((item, index) => (
                                            <div key={index} className="relative flex items-center justify-between md:justify-around md:even:flex-row-reverse group is-active">
                                                
                                                {/* Date/Time (Left for odd index, Right for even index on md screens) */}
                                                <div className="flex items-center justify-center w-1/2 md:w-auto md:px-6">
                                                    <div className={`text-left text-sm font-medium ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                                        <time className='block text-xs text-gray-500'>
                                                            {format(new Date(item.timestamp), 'dd MMM, yy')}
                                                        </time>
                                                        <time className='block text-gray-700 font-semibold'>
                                                            {format(new Date(item.timestamp), 'h:mm a')}
                                                        </time>
                                                    </div>
                                                </div>

                                                {/* Icon (Center) */}
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 z-10 text-xl shadow">
                                                    {getStatusIcon(item.status)}
                                                </div>

                                                {/* Status/Details (Right for odd index, Left for even index on md screens) */}
                                                <div className="w-1/2 md:w-auto md:px-6">
                                                    <div className={`text-sm py-2 px-4 rounded-lg shadow-md bg-gray-50 border ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                                                        <p className="font-bold text-gray-800">{item.status}</p>
                                                        <p className="text-gray-600 mt-1">Location: {item.location}</p>
                                                        {item.note && <p className="text-gray-500 text-xs mt-1 italic">Note: {item.note}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                

                                <div className='mt-8 flex justify-end'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition'
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ViewTrackingModal;