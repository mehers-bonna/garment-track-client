import React from 'react';
import Card from './Card'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Products = ({limit}) => {
  const {data: products = [], isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/products`)
      return result.data
    },
  })

  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  // Only apply slice if limit exists
  const shownProducts = limit ? products.slice(0, limit) : products;
    return (
    <div className='w-9/12 mx-auto'>
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