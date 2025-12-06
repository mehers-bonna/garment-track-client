import React from 'react';

const AddProductForm = () => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                name='name'
                id='name'
                type='text'
                placeholder='Product Name'
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>
                Category
              </label>
              <select
                required
                className='w-full px-4 py-3 border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                name='category'
              >
                <option value='Select Category'>Select Category</option>
                <option value='T-Shirt'>T-Shirt</option>
                <option value='Denim Jeans'>Denim Jeans</option>
                <option value='Polo Shirt'>Polo Shirt</option>
                <option value='Kurti'>Kurti</option>
                <option value='Hoodies'>Hoodies</option>
                <option value='Formal Shirt'>Formal Shirt</option>
                <option value='Ladies Tops'>Ladies Tops</option>
                <option value='Joggers'>Joggers</option>
                <option value='Kids Wear Set'>Kids Wear Set</option>
                <option value='Jackets'>Jackets</option>
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
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-[#442C2E] bg-white focus:outline-[#442C2E] '
                name='description'
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
                  className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div>

              {/* Quantity */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-[#442C2E] focus:outline-[#442C2E] rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>
            </div>
            {/* Image
            <div className=' p-4  w-full  m-auto rounded-lg grow'>
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
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#442C2E] hover:bg-[#D6A99D]'
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default AddProductForm;