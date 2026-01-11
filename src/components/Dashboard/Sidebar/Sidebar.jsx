import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/gtLogo.PNG'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// User Menu
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ManagerMenu from './Menu/ManagerMenu'
import BuyerMenu from './Menu/BuyerMenu';
import useRole from '../../../hooks/useRole'
import LoadingSpinner from './../../Shared/LoadingSpinner';
import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isRoleLoading] = useRole()

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  
  if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      {/* Small Screen Navbar - Dark mode support added */}
      <div className='bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-[#FEEAE6] flex justify-between md:hidden transition-colors duration-300'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800'
        >
          <AiOutlineBars className='h-5 w-5 dark:text-[#FEEAE6]' />
        </button>
      </div>

      {/* Sidebar - Dark mode colors and transition added */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 dark:bg-[#1a1a1a] border-r dark:border-gray-800 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          {/* Top Content: Logo Section */}
          <div>
            {/* Logo Wrapper - Dark mode adjustment */}
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#FEEAE6] dark:bg-[#2a2a2a] mx-auto'>
              <Link to='/'>
                <h1 className='flex justify-center items-center gap-1 font-bold text-[#442C2E] dark:text-[#FEEAE6] mb-2'> 
                  <span><FaHome /></span>⏪ Go Home
                </h1>
                <img src={logo} alt='logo' width='100' height='100' className='rounded-md' />
              </Link>
            </div>
          </div>

          {/* Middle Content: Navigation */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {/* Statistics link logic color handles via MenuItem */}
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              
              {/* Role-Based Menu */}
              {role === 'buyer' && <BuyerMenu />}
              {role === 'manager' && <ManagerMenu />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content: Profile & Logout */}
          <div className='border-t dark:border-gray-700 pt-4'>
            <MenuItem
              icon={FcSettings}
              label='Profile'
              address='/dashboard/profile'
            />
            <button
              onClick={logOut}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar