import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdateProductForm from './../Form/UpdateProductForm';

const UpdateProductModal = ({ setIsEditModalOpen, isOpen, product, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={() => setIsEditModalOpen(false)}
    >
      {/* Backdrop for better visibility in dark/light mode */}
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white dark:bg-[#1a1a1a] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl border dark:border-gray-800 transition-colors'
          >
            <div className='flex justify-end'>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-md text-red-500 dark:text-red-400 cursor-pointer hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-bold'
              >
                X
              </button>
            </div>
            <DialogTitle
              as='h3'
              className='text-xl font-bold text-center leading-6 text-gray-900 dark:text-[#FEEAE6]'
            >
              Update Product Info
            </DialogTitle>
            <div className='mt-4 w-full'>
              <UpdateProductForm
                product={product} 
                setIsEditModalOpen={setIsEditModalOpen}
                refetch={refetch}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateProductModal