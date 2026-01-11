import React, { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import UpdateProductModal from '../../Modal/UpdateProductModal';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminAllProductsDataRow = ({ product, refetch }) => {
  const queryClient = useQueryClient();
  let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const initialShowOnHome = (product.showOnHome === true || product.showOnHome === "true");
  const [showOnHome, setShowOnHome] = useState(initialShowOnHome);
  const axiosSecure = useAxiosSecure();

  function openDeleteModal() { setIsDeleteModalOpen(true) }
  function closeDeleteModal() { setIsDeleteModalOpen(false) }

  const { image, name, price, category } = product;

  const handleToggleHome = async () => {
    const newStatus = !showOnHome;
    setShowOnHome(newStatus);

    try {
      const { data } = await axiosSecure.put(
        `/products/toggle-home/${product._id}`,
        { showOnHome: newStatus }
      );

      if (data.modifiedCount > 0) {
        toast.success(`Product visibility updated to: ${newStatus ? 'Home' : 'Hidden'}`);

        queryClient.invalidateQueries({ queryKey: ['featured-products'] });
        refetch();
      } else {
        setShowOnHome(!newStatus);
        toast.error('Could not update visibility. Try again.');
      }
    } catch (error) {
      console.error('Toggle Home Error:', error);
      setShowOnHome(!newStatus);
      toast.error('Failed to update visibility status.');
    }
  };


  return (
    <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-300'>

      {/* Image */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400 mb-1">Image:</span>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img alt='product image' src={image} className='mx-auto object-cover rounded h-10 w-15 border dark:border-gray-700' />
            </div>
          </div>
        </div>
      </td>

      {/* Name */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Name:</span>
        <p className='text-gray-900 dark:text-gray-200 font-medium'>{name}</p>
      </td>

      {/* Price */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Price:</span>
        <p className='text-gray-900 dark:text-gray-200'>${price}</p>
      </td>

      {/* Category */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Category:</span>
        <p className='text-gray-900 dark:text-gray-200'>{category}</p>
      </td>

      {/* Created By */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Created By:</span>
        <p className='text-gray-900 dark:text-gray-200'>{product?.manager?.name}</p>
      </td>

      {/* Show on Home Toggle */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400 mb-1">Show on Home:</span>
        <label htmlFor={`toggle-${product._id}`} className='flex items-center cursor-pointer justify-start md:justify-start'>
          <div className='relative'>
            <input type='checkbox' id={`toggle-${product._id}`} className='sr-only' checked={showOnHome} onChange={handleToggleHome} />
            <div className='block bg-gray-400 dark:bg-gray-700 w-10 h-6 rounded-full transition-colors'></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${showOnHome ? 'translate-x-4 bg-lime-500' : 'bg-gray-200'}`}></div>
          </div>
          <div className='ml-3 text-gray-700 dark:text-gray-300 font-medium'>{showOnHome ? 'Yes' : 'No'}</div>
        </label>
      </td>

      {/* Action Buttons */}
      <td className='px-5 py-3 md:py-5 border-b-0 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400 mb-1">Action:</span>
        <div className='flex gap-2 items-center justify-start md:justify-start'>

          {/* Delete Button */}
          <span onClick={openDeleteModal} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 dark:text-red-400 leading-tight whitespace-nowrap'>
            <span aria-hidden='true' className='absolute inset-0 bg-red-200 dark:bg-red-900/30 opacity-50 rounded-full'></span>
            <span className='relative'>Delete</span>
          </span>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            id={product._id}
            refetch={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ['featured-products'] });
            }}
          />

          {/* Update Button */}
          <span onClick={() => setIsEditModalOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-400 leading-tight whitespace-nowrap'>
            <span aria-hidden='true' className='absolute inset-0 bg-green-200 dark:bg-green-900/30 opacity-50 rounded-full'></span>
            <span className='relative'>Update</span>
          </span>
          <UpdateProductModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            product={product}
            refetch={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ['featured-products'] });
            }}
          />

        </div>
      </td>
    </tr>
  )
};

export default AdminAllProductsDataRow;