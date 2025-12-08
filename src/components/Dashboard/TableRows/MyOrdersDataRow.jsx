import React from 'react';

const MyOrdersDataRow = () => {

  return (
    <tr>
       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>1</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>shirt</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>5</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>pending</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>stripe</p>
      </td>

      <div>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>View</span>
        </button>
      </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Cancel</span>
        </button>
      </td>
      </div>
     
    </tr>
  )
};

export default MyOrdersDataRow;