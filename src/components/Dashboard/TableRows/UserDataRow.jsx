import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const { name, email, role, status } = user

  return (
    <tr className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] md:table-row block mb-4 md:mb-0 shadow md:shadow-none transition-colors duration-200'>

      {/* Name */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Name:</span>
        <p className='text-gray-900 dark:text-gray-200 font-medium'>{name}</p>
      </td>

      {/* Email */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Email:</span>
        <p className='text-gray-900 dark:text-gray-200'>{email}</p>
        <p className='text-xs text-gray-500 dark:text-gray-400'>ID: {user._id}</p>
      </td>

      {/* Role */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Role:</span>
        <p className='text-gray-900 dark:text-gray-200 capitalize'>{role}</p>
      </td>

      {/* Status */}
      <td className='px-5 py-3 md:py-5 border-b md:border-b-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Status:</span>
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
          status === 'suspended' 
            ? 'bg-red-200 text-red-900 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-green-200 text-green-900 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>

      {/* Action */}
      <td className='px-5 py-3 md:py-5 border-b-0 bg-white dark:bg-[#1a1a1a] text-sm block md:table-cell'>
        <span className="md:hidden font-bold block text-xs text-gray-500 dark:text-gray-400">Action:</span>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-400 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 dark:bg-green-900/40 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update/Manage</span>
        </span>
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={user}
          refetch={refetch}
        />
      </td>
    </tr>
  )
}

export default UserDataRow