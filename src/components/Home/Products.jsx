import React from 'react';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Products = ({ limit, searchText = "" }) => {
  const endpoint = limit ? '/products/featured' : '/products';
  const queryKey = limit ? ['featured-products'] : ['all-products'];

  const { data: products = [], isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const result = await axios(`${import.meta.env.VITE_API_URL}${endpoint}`);
        return result.data;
      } catch (error) {
        console.error(`Error fetching products:`, error);
        return [];
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const shownProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className='w-9/12 mx-auto'>
      {shownProducts.length === 0 && !isLoading && (
        <div className='text-center py-10 text-xl text-gray-600'>
          {limit ? 'No featured products available.' : 'No products found.'}
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
