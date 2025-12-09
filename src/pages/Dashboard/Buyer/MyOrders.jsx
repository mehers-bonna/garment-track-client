import axios from 'axios';
import MyOrdersDataRow from '../../../components/Dashboard/TableRows/MyOrdersDataRow';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const MyOrders = () => {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`);
      return result.data;
    },
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
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Order Id
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Product
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Quantity
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Status
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Payment
                    </th>
                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map(order => (
                    <MyOrdersDataRow
                      key={order._id}
                      order={order}
                      onView={() => setViewOrder(order)}
                      onCancel={() => setCancelOrder(order)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>

            <p><strong>Order ID:</strong> {viewOrder.productId}</p>
            <p><strong>Product:</strong> {viewOrder.name}</p>
            <p><strong>Quantity:</strong> {viewOrder.availableQuantity}</p>
            <p><strong>Status:</strong> {viewOrder.status}</p>

            <h3 className="mt-4 mb-1 font-semibold">Tracking Timeline:</h3>
            <ul className="list-disc ml-5 text-sm">
              <li>Order Placed</li>
              <li>Processing</li>
              <li>Shipped</li>
              <li>Delivered</li>
            </ul>

            <button
              onClick={() => setViewOrder(null)}
              className='relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight mt-4'
            >
              <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
              <span className='relative'>Close</span>
            </button>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRM MODAL */}
      {cancelOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Cancel Order?</h2>
            <p className="mb-4">Are you sure you want to cancel this order?</p>

            <button
              onClick={() => setCancelOrder(null)}
              className='relative inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
            >
              <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
              <span className='relative'>Confirm</span>
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default MyOrders;
