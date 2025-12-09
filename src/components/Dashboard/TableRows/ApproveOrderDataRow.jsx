// ApproveOrderDataRow.jsx (FINAL UPDATED CODE)
import React, { useState } from 'react';
import { format } from 'date-fns';
import AddTrackingModal from './../../Modal/AddTrackingModal';
import ViewTrackingModal from '../../Modal/ViewTrackingModal';


const ApproveOrderDataRow = ({ order, refetchOrders }) => { // ⭐ refetchOrders prop add kora holo
  // Modal State Management
  const [isAddTrackingOpen, setIsAddTrackingOpen] = useState(false);
  const [isViewTrackingOpen, setIsViewTrackingOpen] = useState(false);

  const openAddTrackingModal = () => setIsAddTrackingOpen(true);
  const closeAddTrackingModal = () => setIsAddTrackingOpen(false);

  const openViewTrackingModal = () => setIsViewTrackingOpen(true);
  const closeViewTrackingModal = () => setIsViewTrackingOpen(false);


  // Approved date formatting
  const approvedDate = order?.approvedAt ? format(new Date(order.approvedAt), 'dd/MM/yyyy') : 'N/A';

  // Order data destructuring
  const { _id, buyer, name, availableQuantity } = order || {};

  return (
    <>
      {/* ⭐ Add Tracking Modal */}
      <AddTrackingModal
        isOpen={isAddTrackingOpen}
        closeModal={closeAddTrackingModal}
        order={order}
        refetchOrders={refetchOrders} // Tracking update er por order list refresh korar jonno
      />

      {/* View Tracking Modal (Not yet created) */}
      <ViewTrackingModal 
            isOpen={isViewTrackingOpen} 
            closeModal={closeViewTrackingModal} 
            order={order} 
        />

      <tr>
        {/* ... (Table Columns code is same) ... */}
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
          <p className='text-gray-900 '>{_id.slice(-6)}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
          <p className='text-gray-900 '>{buyer}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
          <p className='text-gray-900 '>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
          <p className='text-gray-900 '>{availableQuantity}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
          <p className='text-gray-900 '>{approvedDate}</p>
        </td>

        {/* Action Buttons */}
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
          <div className='flex gap-2 justify-center items-center'>
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