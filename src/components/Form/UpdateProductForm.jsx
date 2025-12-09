// UpdateProductForm.jsx
import React from 'react';
import { useState } from 'react'; 
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import toast from 'react-hot-toast'; 
import useAuth from '../../hooks/useAuth';

const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, 
        formData
    );
    return data.data.display_url;
};


const UpdateProductForm = ({ product, setIsEditModalOpen }) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    
    const [imageText, setImageText] = useState('Upload Image');
    
    
    const [productData, setProductData] = useState({
        name: product?.name || '',
        category: product?.category || 'Select Category',
        description: product?.description || '',
        price: product?.price || 0,
        availableQuantity: product?.availableQuantity || 0,
        image: product?.image || '', 
    });

    
    const { mutateAsync } = useMutation({
        mutationFn: async (updatedProductData) => {
            
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/product/${product._id}`, 
                updatedProductData
            );
            return data;
        },
        onSuccess: () => {
            
            toast.success('Product Updated Successfully!');
            queryClient.invalidateQueries({ queryKey: ['product', user?.email] });
            setIsEditModalOpen(false); 
        },
        onError: (error) => {
            toast.error(`Update failed: ${error.message}`);
        }
    });

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const name = form.name.value;
        const category = form.category.value;
        const description = form.description.value;
        const price = parseFloat(form.price.value);
        const availableQuantity = parseInt(form.quantity.value);
        const imageFile = form.image.files[0];
        
        try {
            let image_url = productData.image; 
            if (imageFile) {
                setImageText('Uploading...');
                image_url = await imageUpload(imageFile);
            }
            
            // Updated product object
            const updatedProduct = {
                name,
                category,
                description,
                price,
                availableQuantity,
                image: image_url, 
            };
            
            await mutateAsync(updatedProduct);

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setImageText('Upload Image');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageText(file.name);
        } else {
            setImageText('Upload Image');
        }
    };


    return (
        <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-10'>
                    <div className='space-y-6'>
                        {/* Name */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='name' className='block text-gray-600'>
                                Name
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-[#D6A99D] focus:outline-[#442C2E] rounded-md bg-white'
                                name='name'
                                id='name'
                                type='text'
                                placeholder='Product Name'
                                required
                                value={productData.name} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        
                        {/* Category */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600 '>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-[#D6A99D] focus:outline-[#442C2E] rounded-md bg-white'
                                name='category'
                                value={productData.category} 
                                onChange={handleInputChange} 
                            >
                                <option value='Select Category'>Select Category</option>
                                <option value='Shirt'>Shirt</option>
                                <option value='Denim Jeans'>Denim Jeans</option>
                                <option value='Pant'>Pant</option>
                                <option value='Jacket'>Jacket</option>
                                <option value='Hoodies'>Hoodies</option>
                                <option value='Accessories'>Accessories</option>
                                <option value='Ladies Tops'>Ladies Tops</option>
                            </select>
                        </div>
                        
                        {/* Description */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                placeholder='Write plant description here...'
                                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-[#D6A99D] bg-white focus:outline-[#442C2E] '
                                name='description'
                                value={productData.description} 
                                onChange={handleInputChange} 
                            ></textarea>
                        </div>
                    </div>
                    <div className='space-y-6 flex flex-col'>
                        {/* Price & Quantity */}
                        <div className='flex justify-between gap-2'>
                            {/* Price */}
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600 '>
                                    Price
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-[#D6A99D] focus:outline-[#442C2E] rounded-md bg-white'
                                    name='price'
                                    id='price'
                                    type='number'
                                    placeholder='Price per unit'
                                    required
                                    value={productData.price} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            {/* Quantity */}
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='quantity' className='block text-gray-600'>
                                    Quantity
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-[#D6A99D] focus:outline-[#442C2E] rounded-md bg-white'
                                    name='quantity'
                                    id='quantity'
                                    type='number'
                                    placeholder='Available quantity'
                                    required
                                    value={productData.availableQuantity} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                        
                        {/* Image */}
                        <div>
                            <label
                                htmlFor='image'
                                className='block mb-2 text-sm font-medium text-gray-700'
                            >
                                {imageText} 
                            </label>
                            <input
                                name='image'
                                type='file'
                                id='image'
                                accept='image/*'
                                className='block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-[#D6A99D] file:text-[#442C2E]
                                hover:file:bg-lime-50
                                bg-gray-100 border border-dashed border-[#442C2E] rounded-md cursor-pointer
                                focus:outline-none focus:ring-2 focus:ring-[#442C2E] focus:border-[#442C2E]
                                py-2'
                                onChange={handleImageChange} 
                            />
                            {/* Existing Image Preview */}
                            {productData.image && !imageText.includes('Uploading') && (
                                <p className='text-xs text-gray-500 mt-1'>
                                    Current Image: <a href={productData.image} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>View</a>
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#442C2E]  hover:bg-[#D6A99D]'
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default UpdateProductForm;