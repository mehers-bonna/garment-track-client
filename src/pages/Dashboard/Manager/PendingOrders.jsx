import React from 'react';
import PendingOrderDataRow from '../../../components/Dashboard/TableRows/PendingOrderDataRow';
import useAuth from './../../../hooks/useAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';

const PendingOrders = () => {

  const { user } = useAuth(); // Logged in user ke newa holo

  // useQuery hook use kore pending orders fetch kora holo
  const { data: pendingOrders = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingOrders', user?.email],
    // Backend API call: /approve-orders/:email
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/approve-orders/${user?.email}`);
      return data;


    },
    enabled: !!user?.email, // User email thakle-i query run hobe
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
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Order Id
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      User
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Product
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Order Date
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map(order => (
                    <PendingOrderDataRow
                      key={order._id}
                      order={order}
                      refetch={refetch} // Refetch function pass kora holo action er por data refresh korar jonno
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

export default PendingOrders;