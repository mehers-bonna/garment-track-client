import React from 'react';
import Products from '../../components/Home/Products';

const AllProducts = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>Our All Products</h1>
            <p className='text-center text-xl text-gray-500 mt-4'>Welcome to our Garment Track</p>

        
       <div>
       <Products></Products>
       </div>
       </div>
    );
};

export default AllProducts;