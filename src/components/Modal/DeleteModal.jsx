// DeleteModal.jsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
// import useAuth from '../../../hooks/useAuth'

// id prop receive kora holo
const DeleteModal = ({ closeModal, isOpen, id }) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Delete Mutation Hook (Ager motoi thakbe)
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      // API call to delete the product
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
      return data
    },
    onSuccess: () => {
      // Success hole toast dekhano hobe
      toast.success('Product Deleted Successfully!')
      // Data refetch korar jonno query invalid kora holo
      queryClient.invalidateQueries({ queryKey: ['product', user?.email] })
      // Modal close kora holo
      closeModal()
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`)
      closeModal()
    }
  })

  // Handle Delete function
  const handleDelete = async () => {
    try {
      await mutateAsync()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            // 1. max-w-sm theke max-w-md kora holo (Size baranor jonno)
            className='w-full max-w-sm sm:max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              // 2. Text center kora holo
              className='text-xl font-bold leading-6 text-gray-900 text-center'
            >
              🗑️ Confirm Deletion
            </DialogTitle>
            <div className='mt-4 mb-6'>
              <p className='text-base text-gray-600 text-center font-medium'>
                Are you absolutely sure you want to **delete** this product?
              </p>
              <p className='text-sm text-red-500 text-center mt-2'>
                This action cannot be undone!
              </p>
            </div>
            <hr className='mb-6 border-gray-200' /> {/* HR line spacing adjust kora holo */}
            <div className='flex justify-center gap-6'> {/* Button space adjust kora holo */}
              <button
                type='button'
                onClick={handleDelete} // Yes button e handleDelete function add kora holo
                // Button style change kora holo (Red color for Delete confirmation)
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-500 px-5 py-2 text-base font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition duration-150'
              >
                Yes, Delete It
              </button>
              <button
                type='button'
                onClick={closeModal}
                // Button style change kora holo (Gray color for Cancel)
                className='cursor-pointer inline-flex justify-center rounded-md border border-gray-300 bg-white px-5 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition duration-150'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteModal