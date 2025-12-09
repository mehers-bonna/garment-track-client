import React, { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import UpdateProductModal from '../../Modal/UpdateProductModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const AdminAllProductsDataRow = ({ product, refetch }) => {
  const queryClient = useQueryClient();
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const initialShowOnHome = (product.showOnHome === true || product.showOnHome === "true");
  const [showOnHome, setShowOnHome] = useState(initialShowOnHome);

  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  const { image, name, price, category } = product;

  const handleToggleHome = async () => {
    const newStatus = !showOnHome;
    setShowOnHome(newStatus);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/toggle-home/${product._id}`,
        { showOnHome: newStatus }
      );

      if (data.modifiedCount > 0) {
        toast.success(`Product visibility updated to: ${newStatus ? 'Home' : 'Hidden'}`);

        // ✅ CRITICAL FIX: Featured Products Cache Invalidate Kora Holo
        queryClient.invalidateQueries({ queryKey: ['featured-products'] });

        refetch(); // Admin table (AdminAllProducts.jsx) refetch
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
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='product image'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{product?.manager?.name}</p>
      </td>

      {/* Show on Home Toggle */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <label htmlFor={`toggle-${product._id}`} className='flex items-center cursor-pointer'>
          <div className='relative'>
            <input
              type='checkbox'
              id={`toggle-${product._id}`}
              className='sr-only'
              checked={showOnHome}
              onChange={handleToggleHome}
            />
            <div className='block bg-gray-600 w-10 h-6 rounded-full'></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${showOnHome ? 'translate-x-4 bg-lime-500' : 'bg-gray-400'}`}></div>
          </div>
          <div className='ml-3 text-gray-700 font-medium'>
            {showOnHome ? 'Yes' : 'No'}
          </div>
        </label>
      </td>

      <div className='flex gap-1'>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <span
            onClick={openModal}
            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Delete</span>
          </span>
          <DeleteModal
            isOpen={isOpen}
            closeModal={closeModal}
            id={product._id}
            refetch={() => {
              // Delete korar por Admin table refetch kora
              refetch();
              // Home Page er cache invalid kora
              queryClient.invalidateQueries({ queryKey: ['featured-products'] });
            }}
          />
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <span
            onClick={() => setIsEditModalOpen(true)}
            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update</span>
          </span>
          <UpdateProductModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            product={product}
            refetch={() => {
              // Update korar por Admin table refetch kora
              refetch();
              // Home Page er cache invalid kora
              queryClient.invalidateQueries({ queryKey: ['featured-products'] });
            }}
          />
        </td>
      </div>
    </tr>
  )
};

export default AdminAllProductsDataRow;