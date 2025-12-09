import React from 'react';

const ApproveOrderDataRow = ({order}) => {

  const { productId, name, availableQuantity, category } = order || {};

  return (
    <tr>
       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{productId}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{availableQuantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>1/2/2025</p>
      </td>

      <div>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Add Tracking</span>
        </button>
      </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>View Tracking</span>
        </button>
      </td>
      </div>
     
    </tr>
  )
};

export default ApproveOrderDataRow;