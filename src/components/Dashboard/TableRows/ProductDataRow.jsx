import React from 'react';
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdateProductModal from '../../Modal/UpdateProductModal';

const ProductDataRow = ({ product }) => {
  let [isOpen, setIsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  const { image, name, price, paymentOptions } = product

  return (
    <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-300'>

      {/* Image */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Image:</span>
        <div className='flex items-center justify-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15'
              />
            </div>
          </div>
        </div>
      </td>

      {/* Name */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell text-center transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Name:</span>
        <p className='text-gray-900 dark:text-gray-200'>{name}</p>
      </td>

      {/* Price */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell text-center transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Price:</span>
        <p className='text-gray-900 dark:text-gray-200'>${price}</p>
      </td>

      {/* Payment Mode */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell text-center transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Payment Mode:</span>
        <p className='text-gray-900 dark:text-gray-200'>{paymentOptions}</p>
      </td>

      {/* Delete Action */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell text-center transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Action:</span>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 dark:text-red-200 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 dark:bg-red-900 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          id={product._id}
        />
      </td>

      {/* Update Action */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell text-center transition-colors duration-300'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Action:</span>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-200 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 dark:bg-green-900 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdateProductModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          product={product}
        />
      </td>
    </tr>
  )
};

export default ProductDataRow;