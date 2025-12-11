import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// Tracking status options
const trackingStatuses = [
    'Cutting Completed',
    'Sewing Started',
    'Finishing',
    'QC Checked',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
];


const AddTrackingModal = ({ closeModal, isOpen, order, refetchOrders }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const { mutateAsync: addTracking, isPending } = useMutation({
        mutationFn: async (trackingData) => {
            const { data } = await axiosSecure.put(
                `/order-tracking/${order._id}`,
                trackingData
            );
            return data;
        },
        onSuccess: () => {
            toast.success('Tracking Updated Successfully!');
            closeModal();
            reset(); 
            refetchOrders(); 
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update tracking.');
        }
    });
    const onSubmit = async (data) => {
        try {
            await addTracking(data);
        } catch (err) {
            console.error(err);
        }
    };
    

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
                            <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                
                                <DialogTitle
                                    as='h3'
                                    className='text-2xl font-bold leading-6 text-gray-900 border-b pb-3 mb-6'
                                >
                                    🚚 Add Tracking Update (Order ID: {order?._id.slice(-6)})
                                </DialogTitle>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Status Selector */}
                                    <div className='mb-4'>
                                        <label htmlFor='status' className='block text-sm font-medium text-gray-700'>Tracking Status *</label>
                                        <select
                                            id='status'
                                            {...register('status', { required: 'Status is required' })}
                                            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border'
                                        >
                                            <option value="">Select Status</option>
                                            {trackingStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                                    </div>

                                    {/* Location Input */}
                                    <div className='mb-4'>
                                        <label htmlFor='location' className='block text-sm font-medium text-gray-700'>Location (e.g., Factory Floor, Warehouse B) *</label>
                                        <input
                                            type='text'
                                            id='location'
                                            {...register('location', { required: 'Location is required' })}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        />
                                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                                    </div>

                                    {/* Note/Description */}
                                    <div className='mb-6'>
                                        <label htmlFor='note' className='block text-sm font-medium text-gray-700'>Note (Optional)</label>
                                        <textarea
                                            id='note'
                                            {...register('note')}
                                            rows='3'
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        ></textarea>
                                    </div>


                                    <div className='mt-4 flex justify-end gap-3'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition'
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            disabled={isPending}
                                            className='inline-flex justify-center rounded-md border border-transparent bg-[#442C2E] px-4 py-2 text-sm font-medium text-white hover:bg-[#D6A99D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A99D] focus-visible:ring-offset-2 disabled:bg-blue-400 transition'
                                        >
                                            {isPending ? 'Saving...' : 'Add Update'}
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddTrackingModal;