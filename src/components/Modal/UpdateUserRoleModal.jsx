import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user.role)
  const [updatedStatus, setUpdatedStatus] = useState(user.status)
  const [suspendReason, setSuspendReason] = useState(user.suspendReason || '')
  const axiosSecure = useAxiosSecure();

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    closeModal()

    const userDataToUpdate = {
      role: updatedRole,
      status: updatedStatus,
      suspendReason: updatedStatus === 'suspended' ? suspendReason : null,
      suspendFeedback: updatedStatus === 'suspended' ? `User suspended by Admin. Reason: ${suspendReason}` : null,
    }

    try {
      const { data } = await axiosSecure.put(`/user/${user._id}`, userDataToUpdate)

      if (data.modifiedCount > 0) {
        toast.success('User updated successfully!')
        refetch()
      } else {
        toast('No changes made.')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user.')
    }
  }


  return (
    <>
      <Dialog
        open={isOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={closeModal}
      >
        {/* Backdrop for better visibility */}
        <div className='fixed inset-0 bg-black/30 dark:bg-black/60' aria-hidden="true" />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white dark:bg-[#1a1a1a] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-xl border dark:border-gray-800'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black dark:text-white'
              >
                Update Role & Status for: <span className='text-[#442C2E] dark:text-[#D6A99D]'>{user.name}</span>
              </DialogTitle>
              
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-4'>{user.email}</p>

              <form onSubmit={handleUpdateUser}>
                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Update Role</label>
                  <select
                    value={updatedRole}
                    onChange={e => setUpdatedRole(e.target.value)}
                    className='w-full my-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-[#262626] text-gray-900 dark:text-gray-200 focus:ring-lime-500 focus:border-lime-500 outline-none'
                    name='role'
                  >
                    <option value='buyer'>Buyer</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Update Status</label>
                  <select
                    value={updatedStatus}
                    onChange={e => setUpdatedStatus(e.target.value)}
                    className='w-full my-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-[#262626] text-gray-900 dark:text-gray-200 focus:ring-lime-500 focus:border-lime-500 outline-none'
                    name='status'
                  >
                    <option value='pending'>Pending</option>
                    <option value='suspended'>Suspended</option>
                  </select>
                </div>

                {updatedStatus === 'suspended' && (
                  <div className='mt-4 transition-all duration-300'>
                    <label className='block text-sm font-medium text-red-700 dark:text-red-400'>Suspension Reason</label>
                    <textarea
                      required
                      value={suspendReason}
                      onChange={e => setSuspendReason(e.target.value)}
                      placeholder='State the reason for suspension...'
                      className='w-full my-1 border border-red-400 dark:border-red-900/50 rounded-lg px-3 py-2 bg-white dark:bg-[#262626] text-gray-900 dark:text-gray-200 focus:ring-red-500 focus:border-red-500 outline-none'
                    />
                  </div>
                )}

                <div className='flex mt-6 justify-between gap-4'>
                  <button
                    type='submit'
                    className='flex-1 cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-600 dark:bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors'
                  >
                    Update User
                  </button>
                  <button
                    type='button'
                    className='flex-1 cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 dark:bg-red-900/20 px-4 py-2 text-sm font-medium text-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default UpdateUserRoleModal