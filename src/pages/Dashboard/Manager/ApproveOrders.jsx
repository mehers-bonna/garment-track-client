import { useQuery } from '@tanstack/react-query'
import ApproveOrderDataRow from '../../../components/Dashboard/TableRows/ApproveOrderDataRow'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const ApprovedOrders = () => {
  const { user } = useAuth()
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/approved-orders/${user?.email}`)
      return result.data
    },
    enabled: !!user?.email,
  })


  if (isLoading) return <LoadingSpinner />
  if (orders.length === 0) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-2xl font-bold text-gray-700'>No Approved Orders Found 🎉</h2>
        <p className='text-gray-500 mt-2'>There are currently no approved orders to manage tracking for.</p>
      </div>
    );
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
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Order Id
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Approved Date
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
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