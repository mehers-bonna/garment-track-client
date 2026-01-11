import { useQuery } from '@tanstack/react-query'
import ApproveOrderDataRow from '../../../components/Dashboard/TableRows/ApproveOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ApprovedOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['approvedOrders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/approved-orders/${user?.email}`)
      return result.data
    },
    enabled: !!user?.email,
  })


  if (isLoading) return <LoadingSpinner />
  
  if (orders.length === 0) {
    return (
      <div className='text-center py-20 transition-colors duration-300'>
        <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>No Approved Orders Found 🎉</h2>
        <p className='text-gray-500 dark:text-gray-400 mt-2'>There are currently no approved orders to manage tracking for.</p>
      </div>
    );
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 transition-colors duration-300 mb-10'>
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
                      Order Id
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Approved Date
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold transition-colors duration-300'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-[#1a1a1a] transition-colors duration-300'>
                  {orders.map(order => (
                    <ApproveOrderDataRow
                      key={order._id}
                      order={order}
                      refetchOrders={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApprovedOrders