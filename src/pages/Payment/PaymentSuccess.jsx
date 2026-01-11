import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#121212] transition-colors duration-300">
      <div className="bg-white dark:bg-[#1a1a1a] shadow-lg dark:shadow-2xl rounded-xl p-10 max-w-md text-center border border-gray-100 dark:border-gray-800">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 text-green-600 dark:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Thank you for your order. Your order is being processed.
        </p>
        
        <Link
          to="/dashboard/my-orders"
          className="inline-block px-6 py-3 bg-[#442C2E] dark:bg-[#D6A99D] hover:bg-[#5a3a3d] dark:hover:bg-[#c4988c] transition-all text-white dark:text-[#1a1a1a] font-bold rounded-lg shadow-md"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;