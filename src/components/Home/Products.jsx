import React from 'react';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Products = ({
    limit,
    searchText = '',
    selectedCategory = 'All',
    sortOrder = '',
    currentPage = 1,
    setCurrentPage,
}) => {
    const endpoint = limit ? '/products/featured' : '/products';
    const queryKey = limit ? ['featured-products'] : ['all-products'];

    const { data: products = [], isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const res = await axios(
                    `${import.meta.env.VITE_API_URL}${endpoint}`
                );
                return res.data;
            } catch (error) {
                console.error('Error fetching products:', error);
                return [];
            }
        },
    });

    if (isLoading) return <LoadingSpinner />;

    /* ---------- FEATURED PRODUCTS (HOME PAGE) ---------- */
    if (limit) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, limit).map(product => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        );
    }

    /* ---------- ALL PRODUCTS PAGE LOGIC ---------- */

    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(
            product => product.category === selectedCategory
        );
    }

    if (sortOrder === 'lowToHigh') {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === 'highToLow') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    /* ---------- PAGINATION ---------- */
    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const safeCurrentPage =
        currentPage > totalPages ? totalPages : currentPage;

    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="w-full">
            {paginatedProducts.length === 0 && (
                <div className="text-center py-10 text-xl text-gray-600">
                    No products found.
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedProducts.map(product => (
                    <Card key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                    {/* Previous */}
                    <button
                        onClick={() =>
                            setCurrentPage(prev => Math.max(prev - 1, 1))
                        }
                        className="px-4 py-2 border rounded"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`px-3 py-2 rounded ${
                                safeCurrentPage === page + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'border'
                            }`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() =>
                            setCurrentPage(prev =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        className="px-4 py-2 border rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
