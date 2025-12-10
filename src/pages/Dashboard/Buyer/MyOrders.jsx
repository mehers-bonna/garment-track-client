import axios from 'axios';
import MyOrdersDataRow from '../../../components/Dashboard/TableRows/MyOrdersDataRow';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import { useState } from 'react';
import ViewMyOrderModal from './../../../components/Modal/ViewMyOrderModal';
import CancelOrderModal from './../../../components/Modal/CancelOrderModal';


const MyOrders = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading, refetch } = useQuery({ 
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`);
      return result.data;


    },
    enabled: !!user?.email
  });

  const [viewOrder, setViewOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

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
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Order Id
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Product
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Quantity
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Status
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Payment
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-xl font-medium text-gray-500 py-10">
                          😢 You have not placed any orders yet.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <MyOrdersDataRow
                        key={order._id}
                        order={order}
                        onView={() => setViewOrder(order)}
                        onCancel={() => setCancelOrder(order)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ViewMyOrderModal
        order={viewOrder}
        isOpen={!!viewOrder}
        closeModal={() => setViewOrder(null)}
      />
      <CancelOrderModal
        order={cancelOrder}
        isOpen={!!cancelOrder}
        closeModal={() => setCancelOrder(null)}
        refetchOrders={refetch}
      />

    </>
  );
};

export default MyOrders;