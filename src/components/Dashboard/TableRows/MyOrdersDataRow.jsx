import React from 'react';

const MyOrdersDataRow = ({ order, onView, onCancel }) => {
    const { _id, name, orderQuantity, status, paymentOptions } = order || {};
    const payment = paymentOptions || 'Stripe';

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className='text-gray-900'>{_id}</p> 
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className='text-gray-900'>{name}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className='text-gray-900'>{orderQuantity}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`font-semibold ${status === 'Approved' ? 'text-green-600' : status === 'Rejected' || status === 'Canceled' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {status}
                </p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className='text-gray-900'>{payment}</p>
            </td>

            {/* Actions Column */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-center items-center space-x-2'>
                {/* View Button */}
                <button
                    onClick={onView}
                    className='relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight cursor-pointer'
                >
                    <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
                    <span className='relative'>View</span>
                </button>

                {/* Cancel Button */}
                {status === "Pending" && (
                    <button
                        onClick={onCancel}
                        className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight cursor-pointer'
                    >
                        <span className='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Cancel</span>
                    </button>
                )}
            </td>
        </tr>
    );
};

export default MyOrdersDataRow;