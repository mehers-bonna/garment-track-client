import React from 'react';
import Card from './Card'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Products = ({ limit }) => {
  // Dynamic API Endpoint and Query Key
  const endpoint = limit ? '/products/featured' : '/products';
  const queryKey = limit ? ['featured-products'] : ['all-products'];

  const { data: products = [], isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const result = await axios(`${import.meta.env.VITE_API_URL}${endpoint}`);
        return result.data;
      } catch (error) {
        console.error(`Error fetching ${limit ? 'featured' : 'all'} products:`, error);
        return [];
      }
    },

    // ✅ UPDATE: Ekhane cache related settings (staleTime) remove kora holo.
    // Protibar component mount holei ba window focus korle data fetch hobe.
    // production-e eta rakha uchit, kintu debug-er jonno remove kora holo.
    // staleTime: 10000 
  })

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  // Only apply slice if limit exists (e.g., limit=6 for Home Page)
  const shownProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className='w-9/12 mx-auto'>
      {/* Message change kora holo, All Products page-e sob data ashar kotha */}
      {shownProducts.length === 0 && !isLoading && (
        <div className='text-center py-10 text-xl text-gray-600'>
          {limit ? 'No featured products are available.' : 'No products found in the database.'}
        </div>
      )}
      {shownProducts.length > 0 && (
        <div className='pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {shownProducts.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;