import React from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';
import ErrorPage from '../../pages/ErrorPage';
import { TbFidgetSpinner } from 'react-icons/tb';

const AddProductForm = () => {
  const { user } = useAuth()


  // useMutation hook useCase
  const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      payload),
    onSuccess: data => {
      console.log(data)
      toast.success('Product Added Successfully.')
      mutationReset()

    },
    onError: error => {
      console.log(error)
    },
    onMutate: payload => {
      console.log('I will post this data--->', payload)
    },
    onSettled: (data, error) => {
      if (data) console.log(data);
      if (error) console.log(error);
    },
    retry: 3,
  })

  // react hook form

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { name, description, category, paymentOptions, price, availableQuantity, minimumOrderQuantity } = data
    const imageFile = data?.image[0]


    try {
      const imageUrl = await imageUpload(imageFile)
      const productData = {
        image: imageUrl,
        name,
        description,
        category,
        paymentOptions,
        price: Number(price),
        availableQuantity: Number(availableQuantity),
        minimumOrderQuantity: Number(minimumOrderQuantity),
        manager: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      }


      await mutateAsync(productData)
      reset()
    } catch (err) {
      console.log(err)
    }
  }



  if (isPending) return <LoadingSpinner></LoadingSpinner>
  if (isError) return <ErrorPage></ErrorPage>
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                id='name'
                type='text'
                placeholder='Product Name'
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 20,
                    message: 'Name cannot be too long'
                  }
                })}
              />
              {errors.name && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>
                Category
              </label>
              <select
                className='w-full px-4 py-3 border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                {...register('category', { required: 'Category is required' })}
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
              {errors.category && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* payment options */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='payment options' className='block text-gray-600 '>
                Payment Options
              </label>
              <select
                className='w-full px-4 py-3 border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                {...register('paymentOptions', { required: 'Payment Options is required' })}
              >
                <option value='Select Category'>Select Payment Options</option>
                <option value='Cash on Delivery'>Cash on Delivery</option>
                <option value='Stripe'>Stripe </option>
              </select>
              {errors.paymentOptions && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.paymentOptions.message}
                </p>
              )}
            </div>
            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                placeholder='Write product description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-[#442C2E] bg-white focus:outline-[#442C2E] '
                {...register('description', {
                  required: 'Description is required',
                })}
              ></textarea>
              {errors.description && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.description.message}
                </p>
              )}
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
                  className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  {...register('price', {
                    required: 'Price is required',
                  })}
                />
                {errors.price && (
                  <p className='text-xs text-red-500 mt-1'>
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Available Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  {...register('availableQuantity', {
                    required: 'Available quantity is required',
                  })}
                />
                {errors.availableQuantity && (
                  <p className='text-xs text-red-500 mt-1'>
                    {errors.availableQuantity.message}
                  </p>
                )}
              </div>
            </div>
            {/* Minimum order Quantity */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='quantity' className='block text-gray-600'>
                Minimum order Quantity
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                id='quantity'
                type='number'
                placeholder='Minimum order quantity'
                {...register('minimumOrderQuantity', {
                  required: 'Minimum Order quantity is required',
                })}
              />
              {errors.minimumOrderQuantity && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.minimumOrderQuantity.message}
                </p>
              )}
            </div>
            {/* Image */}
            {/* <div className=' p-4  w-full  m-auto rounded-lg grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-[#442C2E] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#D6A99D]'>
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div> */}

            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Product Image
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
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-[#442C2E] rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-[#442C2E] focus:border-[#442C2E]
      py-2'
                {...register('image', {
                  required: 'Image is required'
                })}
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
              {errors.image && (
                <p className='text-xs text-red-500 mt-1'>{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#442C2E] hover:bg-[#D6A99D]'
            >
              {isPending ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default AddProductForm;