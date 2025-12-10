import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user.role)
  const [updatedStatus, setUpdatedStatus] = useState(user.status)
  const [suspendReason, setSuspendReason] = useState(user.suspendReason || '')
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
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user/${user._id}`, userDataToUpdate)

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
        className='relative z-10 focus:outline-none'
        onClose={closeModal}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                Update Role & Status for: {user.name} ({user.email})
              </DialogTitle>
              <form onSubmit={handleUpdateUser}>
                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700'>Update Role</label>
                  <select
                    value={updatedRole}
                    onChange={e => setUpdatedRole(e.target.value)}
                    className='w-full my-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-lime-500 focus:border-lime-500'
                    name='role'
                  >
                    <option value='buyer'>Buyer</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700'>Update Status</label>
                  <select
                    value={updatedStatus}
                    onChange={e => setUpdatedStatus(e.target.value)}
                    className='w-full my-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-lime-500 focus:border-lime-500'
                    name='status'
                  >
                    <option value='pending'>Pending</option>
                    <option value='suspended'>Suspended</option>
                  </select>
                </div>
                {updatedStatus === 'suspended' && (
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-red-700'>Suspension Reason</label>
                    <textarea
                      required
                      value={suspendReason}
                      onChange={e => setSuspendReason(e.target.value)}
                      placeholder='State the reason for suspension (e.g., Policy Violation).'
                      className='w-full my-1 border border-red-400 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500'
                    />
                  </div>
                )}

                <div className='flex mt-4 justify-around'>
                  <button
                    type='submit'
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                  >
                    Update User
                  </button>
                  <button
                    type='button'
                    className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
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