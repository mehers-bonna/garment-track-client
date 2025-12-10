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
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                            <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                
                                <DialogTitle
                                    as='h3'
                                    className='text-2xl font-bold leading-6 text-gray-900 border-b pb-3 mb-4'
                                >
                                    🛍️ Order Details
                                </DialogTitle>

                                <div className='space-y-3 text-gray-700'>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Order ID:</span> 
                                        {_id.slice(-8).toUpperCase()}
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Status:</span> 
                                        <span className={`font-bold ${status === 'Approved' ? 'text-green-600' : status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {status}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Buyer:</span> {buyer}
                                    </p>
                                    <hr className='my-3 border-gray-200'/>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Product:</span> {name} ({category})
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Quantity:</span> {availableQuantity}
                                    </p>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Price:</span> ${price}
                                    </p>
                                    <p className='break-words'>
                                        <span className='font-semibold w-32 inline-block'>Tx ID:</span> {transactionId}
                                    </p>
                                    <hr className='my-3 border-gray-200'/>
                                    <p>
                                        <span className='font-semibold w-32 inline-block'>Manager:</span> {manager?.name} ({manager?.email})
                                    </p>
                                </div>

                                <div className='mt-6 flex justify-end'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition'
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