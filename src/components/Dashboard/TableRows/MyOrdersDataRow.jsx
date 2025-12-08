import React from 'react';

const MyOrdersDataRow = ({ order, onView, onCancel }) => {
  const { productId, name, availableQuantity, status } = order || {};

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{productId}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{name}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{availableQuantity}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>Stripe</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={onView}
          className='relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight cursor-pointer'
        >
          <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative'>View</span>
        </button>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {status === "Pending" && (
          <button
            onClick={onCancel}
            className='relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight cursor-pointer'
          >
            <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
            <span className='relative'>Cancel</span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default MyOrdersDataRow;
