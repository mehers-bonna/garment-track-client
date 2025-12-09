// DeleteModal.jsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const DeleteModal = ({ closeModal, isOpen, id }) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
      return data
    },
    onSuccess: () => {
      toast.success('Product Deleted Successfully!')
      queryClient.invalidateQueries({ queryKey: ['product', user?.email] })
      closeModal()
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`)
      closeModal()
    }
  })

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
            className='w-full max-w-sm sm:max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
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
            <hr className='mb-6 border-gray-200' /> 
            <div className='flex justify-center gap-6'> 
              <button
                type='button'
                onClick={handleDelete} 
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-500 px-5 py-2 text-base font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition duration-150'
              >
                Yes, Delete It
              </button>
              <button
                type='button'
                onClick={closeModal}
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