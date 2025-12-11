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
      <tr className='border-b border-gray-200 bg-white md:table-row block mb-4 md:mb-0 shadow md:shadow-none'>

        {/* Order Id */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
          <span className="md:hidden font-bold block text-xs text-gray-500">Order Id:</span>
          <p className='text-gray-900 text-center'>{_id}</p>
        </td>

        {/* User */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
          <span className="md:hidden font-bold block text-xs text-gray-500">User:</span>
          <p className='text-gray-900 text-center'>{buyer}</p>
        </td>

        {/* Product */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
          <span className="md:hidden font-bold block text-xs text-gray-500">Product:</span>
          <p className='text-gray-900 text-center'>{name}</p>
        </td>

        {/* Quantity */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
          <span className="md:hidden font-bold block text-xs text-gray-500">Quantity:</span>
          <p className='text-gray-900 text-center'>{orderQuantity}</p>

        </td>

        {/* Approved Date */}
        <td className='px-5 py-3 md:py-3 border-b md:border-b-0 md:border-gray-200 bg-white text-sm block md:table-cell md:text-left'>
          <span className="md:hidden font-bold block text-xs text-gray-500">Approved Date:</span>
          <p className='text-gray-900 text-center'>{approvedDate}</p>
        </td>

        {/* Action Buttons */}
        <td className='px-5 py-3 md:py-3 border-b-0 bg-white text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500">Action:</span>
          <div className='flex gap-2 justify-center items-center '>
            {/* Add Tracking Button */}
            <button
              onClick={openAddTrackingModal}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight rounded-full bg-green-200 hover:bg-green-300 transition'
            >
              <span className='relative'>Add Tracking</span>
            </button>

            {/* View Tracking Button */}
            <button
              onClick={openViewTrackingModal}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight rounded-full bg-blue-200 hover:bg-blue-300 transition'
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