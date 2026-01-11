import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React from 'react';

const ViewOrderModal = ({ closeModal, isOpen, order }) => {
    if (!order) return null; 
    const { 
        _id, 
        buyer, 
        name, 
        category,
        availableQuantity, 
        price,
        transactionId,
        status, 
        manager 
    } = order;

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as='div' className='relative z-50' onClose={closeModal}>
                <TransitionChild
                    as={React.Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity' />
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
                            <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] p-6 text-left align-middle shadow-xl transition-all border dark:border-gray-800'>
                                
                                <DialogTitle
                                    as='h3'
                                    className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100 border-b dark:border-gray-800 pb-3 mb-4'
                                >
                                    🛍️ Order Details
                                </DialogTitle>

                                <div className='space-y-3 text-gray-700 dark:text-gray-300'>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Order ID:</span> 
                                        <span className='text-gray-900 dark:text-gray-100 font-mono'>{_id.slice(-8).toUpperCase()}</span>
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Status:</span> 
                                        <span className={`font-bold ${status === 'Approved' ? 'text-green-600 dark:text-green-400' : status === 'Pending' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {status}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Buyer:</span> 
                                        <span className='text-gray-900 dark:text-gray-100'>{buyer}</span>
                                    </p>
                                    <hr className='my-3 border-gray-200 dark:border-gray-800'/>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Product:</span> 
                                        <span className='text-gray-900 dark:text-gray-100'>{name} ({category})</span>
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Quantity:</span> 
                                        <span className='text-gray-900 dark:text-gray-100'>{availableQuantity}</span>
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Price:</span> 
                                        <span className='text-gray-900 dark:text-gray-100'>${price}</span>
                                    </p>
                                    <p className='break-words'>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Tx ID:</span> 
                                        <span className='text-gray-900 dark:text-gray-100 font-mono text-sm'>{transactionId}</span>
                                    </p>
                                    <hr className='my-3 border-gray-200 dark:border-gray-800'/>
                                    <p>
                                        <span className='font-semibold w-32 inline-block text-gray-600 dark:text-gray-400'>Manager:</span> 
                                        <span className='text-gray-900 dark:text-gray-100'>{manager?.name} ({manager?.email})</span>
                                    </p>
                                </div>

                                <div className='mt-6 flex justify-end'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition'
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

export default ViewOrderModal;