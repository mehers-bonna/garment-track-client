import { useQuery } from '@tanstack/react-query';
import ProductDataRow from '../../../components/Dashboard/TableRows/ProductDataRow';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProduct = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['product', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/manage-product/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });
  console.log("Fetched Products:", products);
  console.log("Logged User Email:", user?.email);



  if (isLoading) return <LoadingSpinner />;


  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 transition-colors duration-300 mb-20'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow-lg rounded-lg overflow-hidden border dark:border-gray-800'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className='hidden md:table-row'>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Payment Mode
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-[#1a1a1a]'>
                  {
                    products.map(product => (
                      <ProductDataRow key={product._id} product={product} />
                    ))
                  }
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProduct