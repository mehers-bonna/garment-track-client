import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AdminAllProductsDataRow from '../../../components/Dashboard/TableRows/AdminAllProductsDataRow';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminAllProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error('Failed to fetch products for Admin Table.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  if (loading) {
    return <div className='text-center py-20'><LoadingSpinner /></div>;
  }
  if (products.length === 0) {
    return (
      <div className='text-center py-20 text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300'>
        No products found in the database.
      </div>
    );
  }


  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 transition-colors duration-300 mb-12'>
        <div className='py-8'>
          <h2 className='text-2xl font-semibold leading-tight mb-4 text-gray-800 dark:text-gray-100'>
            Manage All Products
          </h2>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden border dark:border-gray-800 transition-colors'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className='hidden md:table-row'>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Image
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Name
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Price
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Category
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Created By
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Show on Home
                    </th>
                    <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <AdminAllProductsDataRow
                      key={product._id}
                      product={product}
                      refetch={fetchProducts}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllProducts;