import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const { name, email, role, status } = user

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{email}</p>
        <p className='text-xs text-gray-500'>ID: {user._id}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${status === 'suspended' ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
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