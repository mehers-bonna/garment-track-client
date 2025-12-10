import React, { useState } from 'react';
import Products from '../../components/Home/Products';

const AllProducts = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>Our All Products</h1>
            <p className='text-center text-xl text-gray-500 mt-4'>Welcome to our Garment Track</p>

            {/* Search Input */}
            <div className="flex justify-center mt-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border border-gray-300 w-80 p-2 rounded-md shadow-sm focus:outline-blue-500"
                />
            </div>

            {/* Products with searchText */}
            <div className="mt-8">
                <Products searchText={searchText}></Products>
            </div>
        </div>
    );
};

export default AllProducts;
