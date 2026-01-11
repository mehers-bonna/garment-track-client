import React, { useState } from 'react';
import Products from '../../components/Home/Products';

const AllProducts = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const resetFilters = () => {
        setSearchText('');
        setSelectedCategory('All');
        setSortOrder('');
        setCurrentPage(1);
    };

    return (
        <div className='mb-30'>
            <h1 className="text-3xl font-bold text-center mt-10">
                Our All Products
            </h1>

            <p className="text-center text-xl text-gray-500 mt-4">
                Welcome to our Garment Track
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 px-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={e => {
                        setSearchText(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border p-2 rounded-md w-full sm:w-64"
                />

                <select
                    value={selectedCategory}
                    onChange={e => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border p-2 rounded-md w-full sm:w-48"
                >
                    <option value="All">All Categories</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Denim Jeans">Denim Jeans</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Ladies Tops">Ladies Tops</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={e => {
                        setSortOrder(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border p-2 rounded-md w-full sm:w-48"
                >
                    <option value="">Sort by Price</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>

                <button
                    onClick={resetFilters}
                    className="border px-4 py-2 rounded-md bg-[#442C2E] text-white hover:bg-[#D6A99D]"
                >
                    Reset
                </button>
            </div>

            {/* Products */}
            <div className="w-9/12 mx-auto mt-10 mb-20">
                <Products
                    searchText={searchText}
                    selectedCategory={selectedCategory}
                    sortOrder={sortOrder}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AllProducts;
