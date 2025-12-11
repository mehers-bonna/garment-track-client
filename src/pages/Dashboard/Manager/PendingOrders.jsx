import React from 'react';
import PendingOrderDataRow from '../../../components/Dashboard/TableRows/PendingOrderDataRow';
import useAuth from './../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PendingOrders = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: pendingOrders = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingOrders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/approve-orders/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;


  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className='hidden md:table-row'>
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
                      Order Date
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
                  {pendingOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-xl font-medium text-gray-500 py-10">
                          💔 No pending orders available right now!
                        </p>
                      </td>
                    </tr>
                  ) : (
                    pendingOrders.map(order => (
                      <PendingOrderDataRow
                        key={order._id}
                        order={order}
                        refetch={refetch}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingOrders;