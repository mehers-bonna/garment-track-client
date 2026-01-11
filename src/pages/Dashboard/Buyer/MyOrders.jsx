import MyOrdersDataRow from '../../../components/Dashboard/TableRows/MyOrdersDataRow';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import { useState } from 'react';
import ViewMyOrderModal from './../../../components/Modal/ViewMyOrderModal';
import CancelOrderModal from './../../../components/Modal/CancelOrderModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-orders/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email
  });

  const [viewOrder, setViewOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 md:px-8 transition-colors duration-300 my-10">
        <div className="py-4 md:py-8">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border dark:border-gray-800">
              <table className="min-w-full leading-normal">
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Order Id
                    </th>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Product
                    </th>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Quantity
                    </th>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Status
                    </th>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Payment
                    </th>
                    <th className="px-3 md:px-5 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-[#FEEAE6] text-left text-xs md:text-sm uppercase font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-[#0f0f0f]">
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm text-center"
                      >
                        <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 py-10">
                          😢 You have not placed any orders yet.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
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