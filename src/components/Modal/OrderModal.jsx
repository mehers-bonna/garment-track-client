import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const OrderModal = ({ closeModal, isOpen, product }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { _id, name, category, price, availableQuantity, minimumOrderQuantity, manager } = product || {};
    const initialQuantity = minimumOrderQuantity || 1;

    const [orderQuantity, setOrderQuantity] = useState(initialQuantity);
    const [totalPrice, setTotalPrice] = useState(price * initialQuantity);
    const [contactNumber, setContactNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (price && minimumOrderQuantity) {
            const minQty = minimumOrderQuantity || 1;
            setOrderQuantity(minQty);
            setTotalPrice(price * minQty);
        }
    }, [price, minimumOrderQuantity]);

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        if (isNaN(quantity) || quantity < 1) {
            setOrderQuantity(1);
            setTotalPrice(price * 1);
            toast.error("Quantity must be a valid number.");
            return;
        }
        if (quantity < minimumOrderQuantity) { 
            toast.error(`Order must be at least ${minimumOrderQuantity} units.`);
            setOrderQuantity(quantity);
            setTotalPrice(price * quantity);
            return;
        }
        if (quantity > availableQuantity) {
            toast.error(`Only ${availableQuantity} units are available.`);
            setOrderQuantity(availableQuantity); 
            setTotalPrice(price * availableQuantity);
            return;
        }
        setOrderQuantity(quantity);
        setTotalPrice(price * quantity);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (orderQuantity < minimumOrderQuantity || orderQuantity > availableQuantity || !firstName || !lastName || !contactNumber || !deliveryAddress) {
            toast.error("Please ensure quantity is valid and all required personal fields are filled.");
            return;
        }

        closeModal();
        toast.loading('Processing order and redirecting to payment...');

        const paymentInfo = {
            productId: _id,
            name,
            category,
            price: price,
            description: product.description,
            image: product.image,
            orderQuantity, 
            totalPrice, 
            deliveryInfo: {
                firstName: firstName,
                lastName: lastName,
                contactNumber: contactNumber,
                deliveryAddress: deliveryAddress,
                additionalNotes: additionalNotes,
            },
            manager,
            buyer: {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL
            }
        };

        try {
            const { data } = await axiosSecure.post(
                `/create-checkout-session`,
                paymentInfo
            );
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to get payment URL.");
            }
            
        } catch (err) {
            console.error(err);
            toast.error("Could not initiate payment. Please try again.");
        }
    };

    return (
        <Dialog
            open={isOpen}
            as='div'
            className='relative z-[150] focus:outline-none'
            onClose={closeModal}
        >
            {/* Background Overlay */}
            <div className='fixed inset-0 bg-black/50 dark:bg-black/80' aria-hidden='true' /> 
            
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel
                        transition
                        className='w-full max-w-xl bg-white dark:bg-[#1a1a1a] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-2xl border dark:border-gray-800'
                    >
                        <DialogTitle
                            as='h3'
                            className='text-xl font-bold text-center leading-6 text-gray-900 dark:text-gray-100 border-b dark:border-gray-800 pb-3'
                        >
                            Place Your Order for {name}
                        </DialogTitle>
                        
                        <form onSubmit={handleSubmit} className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
                            
                            {/* Product Info Summary */}
                            <div className='sm:col-span-2 space-y-2 mb-2 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#252525]'>
                                <p className='text-sm text-gray-700 dark:text-gray-300 font-semibold'>Product: {name}</p>
                                <p className='text-sm text-gray-700 dark:text-gray-300'>Category: {category}</p>
                                <p className='text-sm text-gray-700 dark:text-gray-300'>Unit Price: ${price}</p>
                                <p className='text-sm text-gray-700 dark:text-gray-300 font-medium text-orange-600 dark:text-orange-400'>Stock: {availableQuantity} (Min Order: {minimumOrderQuantity})</p>
                            </div>
                            
                            {/* Buyer Info */}
                            <div className='sm:col-span-2 space-y-2 p-3 border dark:border-indigo-900/30 rounded-lg bg-indigo-50 dark:bg-indigo-900/10'>
                                <p className='text-xs text-indigo-800 dark:text-indigo-300 font-medium italic text-center'>Ordering as: {user?.email}</p>
                            </div>

                            {/* First Name */}
                            <div>
                                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    First Name *
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Last Name *
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                                    />
                                </div>
                            </div>
                            
                            {/* Order Quantity */}
                            <div>
                                <label htmlFor='orderQuantity' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Order Quantity *
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='number'
                                        id='orderQuantity'
                                        name='orderQuantity'
                                        value={orderQuantity}
                                        onChange={handleQuantityChange}
                                        min={minimumOrderQuantity || 1}
                                        max={availableQuantity}
                                        required
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white font-bold'
                                    />
                                </div>
                            </div>
                            
                            {/* Total Order Price */}
                            <div>
                                <label htmlFor='totalPrice' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Total Price
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        id='totalPrice'
                                        value={`$${totalPrice.toFixed(2)}`}
                                        readOnly
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm bg-gray-100 dark:bg-[#333] sm:text-sm p-2 border font-bold text-lg text-indigo-600 dark:text-indigo-400'
                                    />
                                </div>
                            </div>

                            {/* Contact Number */}
                            <div className='sm:col-span-2'>
                                <label htmlFor='contactNumber' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Contact Number *
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='tel'
                                        id='contactNumber'
                                        name='contactNumber'
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        required
                                        placeholder='Enter your phone number'
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                                    />
                                </div>
                            </div>
                            
                            {/* Delivery Address */}
                            <div className='sm:col-span-2'>
                                <label htmlFor='deliveryAddress' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Delivery Address *
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        id='deliveryAddress'
                                        name='deliveryAddress'
                                        rows='2'
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        required
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                                    />
                                </div>
                            </div>
                            
                            {/* Additional Notes */}
                            <div className='sm:col-span-2'>
                                <label htmlFor='additionalNotes' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Additional Notes (Optional)
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        id='additionalNotes'
                                        name='additionalNotes'
                                        rows='2'
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        className='block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='sm:col-span-2 flex mt-2 justify-end gap-3'>
                                <button
                                    type='button'
                                    className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors border dark:border-gray-700'
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-500 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default OrderModal;