import React, { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router'; 
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { FaCheckCircle, FaTruck } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const statusIcons = {
    'Order Placed': <FaCheckCircle className="text-blue-500 text-xl" />,
    'Cutting Completed': <FaCheckCircle className="text-indigo-500 text-xl" />,
    'Sewing Started': <FaCheckCircle className="text-purple-500 text-xl" />,
    'Finishing': <FaCheckCircle className="text-pink-500 text-xl" />,
    'QC Checked': <FaCheckCircle className="text-green-500 text-xl" />,
    'Packed': <FaCheckCircle className="text-yellow-500 text-xl" />,
    'Shipped': <FaTruck className="text-orange-500 text-xl" />,
    'Out for Delivery': <FaTruck className="text-red-500 text-xl" />,
    'Delivered': <FaCheckCircle className="text-lime-500 text-xl" />,
};


const TrackOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate(); 
    const [inputOrderId, setInputOrderId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { 
        data: order = {}, 
        isLoading, 
        error 
    } = useQuery({
        queryKey: ['orderTracking', orderId],
        queryFn: async () => {
            if (!orderId) return null; 
            const { data } = await axiosSecure.get(
                `/order/${orderId}` 
            );

            return data;
        },
        enabled: !!orderId,
    });
    if (!orderId) {
        
        const handleTrackSubmit = (e) => {
            e.preventDefault();
            if (inputOrderId.trim()) {
                navigate(`/dashboard/track-order/${inputOrderId.trim()}`);
            }
        };

        return (
            <div className='container mx-auto px-4 sm:px-8 py-8'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800'>🔍 Track Your Order</h1>
                <div className='bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto'>
                    <form onSubmit={handleTrackSubmit}>
                        <label htmlFor="order-id" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Your Order ID
                        </label>
                        <input
                            type="text"
                            id="order-id"
                            value={inputOrderId}
                            onChange={(e) => setInputOrderId(e.target.value)}
                            placeholder="e.g., 6936db0a6cad258729009460"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                        />
                        <button 
                            type="submit"
                            className="mt-4 w-full bg-lime-500 text-white p-3 rounded-lg font-semibold hover:bg-lime-600 transition duration-200"
                        >
                            Track Now
                        </button>
                    </form>
                    <p className='mt-4 text-center text-sm text-gray-500'>
                        Use the Order ID provided in your "My Orders" section or confirmation email.
                    </p>
                </div>
            </div>
        );
    }
    
    if (isLoading) return <LoadingSpinner />;
    if (error) {
         const errorMessage = error.response?.data?.message || error.message;
         return <div className='text-center text-red-500 mt-10'>Error loading order: {errorMessage}</div>;
    }
    if (!order || !order._id) return <div className='text-center text-gray-500 mt-10'>Order not found or invalid ID.</div>;
    const trackingHistory = order.tracking || [{
        status: 'Order Placed',
        location: 'Initial Processing',
        timestamp: order.timestamp || new Date().toISOString(),
        notes: 'Order confirmed and waiting for production start.',
    }];
    const sortedTracking = trackingHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const latestStatus = sortedTracking[0] || {};
    
    const isDelivered = latestStatus.status === 'Delivered';
    const currentStatusClass = isDelivered ? 'text-lime-600' : 'text-orange-600';


    return (
        <div className='container mx-auto px-4 sm:px-8 py-8'>
            <h1 className='text-3xl font-bold mb-6 border-b pb-2 text-gray-800'>
                🚚 Track Order: <span className={currentStatusClass}>{orderId.slice(0, 10)}...</span>
            </h1>
            <div className='bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-lime-500'>
                <h2 className='text-xl font-semibold mb-3'>Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Product Name:</strong> {order.name}</p>
                    <p><strong>Order Status:</strong> <span className={`font-bold ${currentStatusClass}`}>{latestStatus.status}</span></p>
                    <p><strong>Quantity:</strong> {order.orderQuantity}</p>
                    <p><strong>Total Price:</strong> ${order.price}</p>
                </div>
            </div>
            <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
                <h2 className='text-xl font-semibold mb-3'>Current Location</h2>
                <div className='h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500'>
                    <p>
                        [Interactive Map Placeholder showing current location: **{latestStatus.location || 'N/A'}**]
                    </p>
                </div>
            </div>

            {/* Timeline View */}
            <div className='bg-white shadow-lg rounded-lg p-6'>
                <h2 className='text-xl font-semibold mb-5 border-b pb-2'>Tracking Timeline</h2>
                
                <div className="relative border-l-4 border-gray-200 ml-4 pl-4 space-y-8">
                    {sortedTracking.map((track, index) => {
                        const isLatest = index === 0;
                        const icon = statusIcons[track.status] || <FaCheckCircle className="text-gray-500 text-xl" />;
                        
                        return (
                            <div key={index} className="relative">
                                <div className={`absolute -left-7 ${isLatest ? 'bg-lime-500' : 'bg-gray-400'} rounded-full p-1 shadow-md`}>
                                    {icon}
                                </div>
                                <div className={`ml-6 p-4 rounded-lg shadow-sm ${isLatest ? 'bg-lime-50 border-l-4 border-lime-600' : 'bg-gray-50'}`}>
                                    <h3 className={`text-lg font-bold ${isLatest ? 'text-lime-700' : 'text-gray-700'}`}>{track.status}</h3>
                                    
                                    <div className="text-sm text-gray-500 mt-1 space-y-1">
                                        <div className='flex items-center space-x-2'>
                                            <BiTimeFive className='text-md' />
                                            <span>{new Date(track.timestamp).toLocaleString()}</span>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <HiOutlineLocationMarker className='text-md' />
                                            <span>{track.location || 'Warehouse/Factory'}</span>
                                        </div>
                                        {track.notes && (
                                            <p className='italic text-gray-600 border-t pt-1 mt-1'>Note: {track.notes}</p>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
                {sortedTracking.length === 0 && (
                    <p className='text-center text-gray-500 mt-5'>No tracking updates available yet.</p>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;