import React from 'react';

const MyOrdersDataRow = ({ order, onView, onCancel }) => {
    const { _id, name, orderQuantity, status, paymentOptions } = order || {};
    const payment = paymentOptions || 'Stripe';

    return (
        <tr className="block md:table-row border md:border-b border-gray-200 dark:border-gray-800 mb-4 md:mb-0 rounded md:rounded-none transition-colors duration-300">

            {/* Order ID */}
            <td className="px-4 py-3 border-b md:border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell">
                <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Order ID: </span>
                <p className="text-gray-900 dark:text-gray-300">{_id}</p>
            </td>

            {/* Product */}
            <td className="px-4 py-3 border-b md:border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell">
                <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Product: </span>
                <p className="text-gray-900 dark:text-gray-300">{name}</p>
            </td>

            {/* Quantity */}
            <td className="px-4 py-3 border-b md:border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell">
                <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Quantity: </span>
                <p className="text-gray-900 dark:text-gray-300">{orderQuantity}</p>
            </td>

            {/* Status */}
            <td className="px-4 py-3 border-b md:border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell">
                <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Status: </span>
                <p
                    className={`font-semibold ${
                        status === 'Approved'
                            ? 'text-green-600 dark:text-green-400'
                            : status === 'Rejected' || status === 'Canceled'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                >
                    {status}
                </p>
            </td>

            {/* Payment */}
            <td className="px-4 py-3 border-b md:border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell">
                <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Payment: </span>
                <p className="text-gray-900 dark:text-gray-300">{payment}</p>
            </td>

            {/* Actions */}
            <td className="px-4 py-3 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell border-b md:border-b border-gray-200 dark:border-gray-800">
                <div className="space-y-2 md:space-y-0 md:flex md:space-x-2">
                    <span className="md:hidden font-semibold dark:text-[#FEEAE6]">Action: </span>

                    {/* View Button */}
                    <button
                        onClick={onView}
                        className="relative inline-block px-3 py-1 font-semibold text-lime-900 dark:text-green-100 leading-tight"
                    >
                        <span className="absolute inset-0 bg-green-200 dark:bg-green-900 opacity-50 rounded-full"></span>
                        <span className="relative">View</span>
                    </button>

                    {/* Cancel Button */}
                    {status === "Pending" && (
                        <button
                            onClick={onCancel}
                            className="relative inline-block px-3 py-1 font-semibold text-red-900 dark:text-red-100 leading-tight"
                        >
                            <span className="absolute inset-0 bg-red-200 dark:bg-red-900 opacity-50 rounded-full"></span>
                            <span className="relative">Cancel</span>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default MyOrdersDataRow;