import React from 'react';

const MyOrdersDataRow = ({ order, onView, onCancel }) => {
    const { _id, name, orderQuantity, status, paymentOptions } = order || {};
    const payment = paymentOptions || 'Stripe';

    return (
        <tr className="block md:table-row border md:border-b md:border-gray-200 mb-4 md:mb-0 rounded md:rounded-none">

            {/* Order ID */}
            <td className="px-4 py-3 border-b md:border-b md:border-gray-200 bg-white text-sm block md:table-cell">
                <span className="md:hidden font-semibold">Order ID: </span>
                <p className="text-gray-900">{_id}</p>
            </td>

            {/* Product */}
            <td className="px-4 py-3 border-b md:border-b md:border-gray-200 bg-white text-sm block md:table-cell">
                <span className="md:hidden font-semibold">Product: </span>
                <p className="text-gray-900">{name}</p>
            </td>

            {/* Quantity */}
            <td className="px-4 py-3 border-b md:border-b md:border-gray-200 bg-white text-sm block md:table-cell">
                <span className="md:hidden font-semibold">Quantity: </span>
                <p className="text-gray-900">{orderQuantity}</p>
            </td>

            {/* Status */}
            <td className="px-4 py-3 border-b md:border-b md:border-gray-200 bg-white text-sm block md:table-cell">
                <span className="md:hidden font-semibold">Status: </span>
                <p
                    className={`font-semibold ${
                        status === 'Approved'
                            ? 'text-green-600'
                            : status === 'Rejected' || status === 'Canceled'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                    }`}
                >
                    {status}
                </p>
            </td>

            {/* Payment */}
            <td className="px-4 py-3 border-b md:border-b md:border-gray-200 bg-white text-sm block md:table-cell">
                <span className="md:hidden font-semibold">Payment: </span>
                <p className="text-gray-900">{payment}</p>
            </td>

            {/* Actions */}
            <td className="px-4 py-3 bg-white text-sm block md:table-cell border-b md:border-b md:border-gray-200">
                <div className="space-y-2 md:space-y-0 md:flex md:space-x-2">
                    <span className="md:hidden font-semibold">Action: </span>

                    {/* View Button */}
                    <button
                        onClick={onView}
                        className="relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
                    >
                        <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">View</span>
                    </button>

                    {/* Cancel Button */}
                    {status === "Pending" && (
                        <button
                            onClick={onCancel}
                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                        >
                            <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                            <span className="relative">Cancel</span>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default MyOrdersDataRow;
