import { useState } from 'react';
import { toast } from 'react-hot-toast';
import OrderDetailsModal from '../../Modal/OrderDetailsModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllOrdersDataRow = ({ order, refetch }) => {
  const {
    _id,
    transactionId,
    buyer,
    name,
    orderQuantity,
    status
  } = order;
  const axiosSecure = useAxiosSecure();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // State for Status management
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);

  // Status Update Handler
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    const previousStatus = currentStatus;
    setCurrentStatus(newStatus);

    try {
      const { data } = await axiosSecure.put(
        `/order-status/${_id}`,
        { status: newStatus }
      );

      if (data.modifiedCount > 0) {
        toast.success(`Order ${transactionId?.slice(0, 8)} status updated to ${newStatus}`);
        refetch();
      } else {
        setCurrentStatus(previousStatus);
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Status Update Error:', error);
      setCurrentStatus(previousStatus);
      toast.error('An error occurred during status update.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to get status pill color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-200 text-green-900 dark:bg-green-900/30 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-200 text-red-900 dark:bg-red-900/30 dark:text-red-400';
      case 'Pending':
      default:
        return 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const handleViewDetails = () => {
    openModal();
  };

  return (
    <>
      <OrderDetailsModal
        order={order}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />

      <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-300'>

        {/* Order ID*/}
        <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Order ID:</span>
          <p className='text-gray-900 dark:text-gray-200 break-all'>{_id}</p>
        </td>

        {/* User Email */}
        <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Buyer Email:</span>
          <p className='text-gray-900 dark:text-gray-200'>{buyer}</p>
        </td>

        {/* Product Name */}
        <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Product:</span>
          <p className='text-gray-900 dark:text-gray-200'>{name}</p>
        </td>

        {/* Quantity */}
        <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Quantity:</span>
          <p className='text-gray-900 dark:text-gray-200'>{orderQuantity}</p>
        </td>

        {/* Status Pill */}
        <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Current Status:</span>
          <span
            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${getStatusColor(currentStatus)} rounded-full`}
          >
            <span className='relative'>{currentStatus}</span>
          </span>
        </td>

        {/* Actions */}
        <td className='px-5 py-3 md:py-5 border-b-0 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
          <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400 mb-1">Actions:</span>
          <div className='flex items-center gap-2'>
            {/* Status Change Dropdown */}
            <select
              required
              className={`p-1 border-2 border-gray-300 dark:border-gray-700 focus:outline-lime-500 rounded-md text-gray-900 dark:text-gray-200 bg-white dark:bg-[#262626] transition-colors ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              value={currentStatus}
              onChange={handleStatusChange}
              disabled={isUpdating}
            >
              <option value='Pending' className='dark:bg-[#1a1a1a]'>Pending</option>
              <option value='Approved' className='dark:bg-[#1a1a1a]'>Approved</option>
              <option value='Rejected' className='dark:bg-[#1a1a1a]'>Rejected</option>
            </select>

            {/* View Button */}
            <button
              onClick={handleViewDetails}
              className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-400 leading-tight'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0 bg-lime-200 dark:bg-green-900/30 opacity-50 rounded-full'
              ></span>
              <span className='relative'>View</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  )
}

export default AllOrdersDataRow;