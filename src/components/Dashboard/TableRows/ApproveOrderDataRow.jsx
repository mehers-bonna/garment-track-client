import React, { useState } from 'react';
import { format } from 'date-fns';
import AddTrackingModal from './../../Modal/AddTrackingModal';
import ViewTrackingModal from '../../Modal/ViewTrackingModal';


const ApproveOrderDataRow = ({ order, refetchOrders }) => {
  const [isAddTrackingOpen, setIsAddTrackingOpen] = useState(false);
  const [isViewTrackingOpen, setIsViewTrackingOpen] = useState(false);

  const openAddTrackingModal = () => setIsAddTrackingOpen(true);
  const closeAddTrackingModal = () => setIsAddTrackingOpen(false);

  const openViewTrackingModal = () => setIsViewTrackingOpen(true);
  const closeViewTrackingModal = () => setIsViewTrackingOpen(false);


  // Approved date formatting
  const approvedDate = order?.approvedAt ? format(new Date(order.approvedAt), 'dd/MM/yyyy') : 'N/A';

  // Order data destructuring
  const { _id, buyer, name, orderQuantity } = order || {};

  return (
    <>
      {/* Add Tracking Modal */}
      <AddTrackingModal
        isOpen={isAddTrackingOpen}
        closeModal={closeAddTrackingModal}
        order={order}
        refetchOrders={refetchOrders}
      />

      {/* View Tracking Modal */}
      <ViewTrackingModal
        isOpen={isViewTrackingOpen}
        closeModal={closeViewTrackingModal}
        order={order}
      />
      <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-300'>

        {/* Order Id */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Order Id:</span>
          <p className='text-gray-900 dark:text-gray-200 text-center'>{_id}</p>
        </td>

        {/* User */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">User:</span>
          <p className='text-gray-900 dark:text-gray-200 text-center'>{buyer}</p>
        </td>

        {/* Product */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Product:</span>
          <p className='text-gray-900 dark:text-gray-200 text-center'>{name}</p>
        </td>

        {/* Quantity */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Quantity:</span>
          <p className='text-gray-900 dark:text-gray-200 text-center'>{orderQuantity}</p>
        </td>

        {/* Approved Date */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 dark:md:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell md:text-left transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Approved Date:</span>
          <p className='text-gray-900 dark:text-gray-200 text-center'>{approvedDate}</p>
        </td>

        {/* Action Buttons */}
        <td className='px-5 py-3 md:py-3 border-b-0 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell transition-colors duration-300'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Action:</span>
          <div className='flex gap-2 justify-center items-center '>
            {/* Add Tracking Button */}
            <button
              onClick={openAddTrackingModal}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-100 leading-tight rounded-full bg-green-200 dark:bg-green-800/60 hover:bg-green-300 dark:hover:bg-green-700 transition-all duration-200'
            >
              <span className='relative'>Add Tracking</span>
            </button>

            {/* View Tracking Button */}
            <button
              onClick={openViewTrackingModal}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 dark:text-blue-100 leading-tight rounded-full bg-blue-200 dark:bg-blue-800/60 hover:bg-blue-300 dark:hover:bg-blue-700 transition-all duration-200'
            >
              <span className='relative'>View Tracking</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  )
};

export default ApproveOrderDataRow;