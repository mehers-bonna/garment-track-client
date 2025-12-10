import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import AdminAllProductsDataRow from '../../../components/Dashboard/TableRows/AdminAllProductsDataRow';
import { toast } from 'react-hot-toast';

const AdminAllProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
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
    return <div className='text-center py-20 text-xl text-gray-600'>No products found in the database.</div>;
  }


  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Image</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Price</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Category</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Created By</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Show on Home</th>
                    <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
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