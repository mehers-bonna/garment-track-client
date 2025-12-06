import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/avatarImg.png'
import logo from '../../../assets/gtLogo.PNG'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const linksBeforeLogin = [
    { name: 'Home', path: '/' },
    { name: 'All-Products', path: '/all-products' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ]

  const linksAfterLogin = [
    { name: 'Home', path: '/' },
    { name: 'All-Products', path: '/all-products' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  // Tailwind class for active link underline
  const activeClass = 'after:block after:h-[2px] after:bg-[#442C2E] after:rounded-full after:transition-all after:duration-300'

  return (
    <div className='sticky top-0 w-9/12 mx-auto rounded-full bg-[#FEEAE6] z-50 shadow-sm'>
      <div className='py-4'>
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex gap-2 items-center justify-between'>
              <NavLink to='/'>
              <img src={logo} alt='logo' width='50' height='50' className='rounded-full' />
            </NavLink>
            <NavLink to='/' className='text-2xl font-bold text-[#442C2E]'>GarmentTrack</NavLink>
            </div>

            {/* Desktop Links */}
            <div className='hidden md:flex items-center gap-6'>
              {(user ? linksAfterLogin : linksBeforeLogin).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-semibold relative hover:text-[#442C2E] transition after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#442C2E] after:rounded-full after:transition-all after:duration-300 ${
                      isActive ? 'after:w-full text-[#442C2E]' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Auth Buttons */}
              {!user && (
                <>
                  <NavLink
                    to='login'
                    className='px-4 py-2 bg-[#442C2E] text-white rounded hover:bg-[#D6A99D] transition font-semibold'
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to='register'
                    className='px-4 py-2 bg-[#442C2E] text-white rounded hover:bg-[#D6A99D] transition font-semibold'
                  >
                    Register
                  </NavLink>
                </>
              )}

              {user && (
                <div className='flex items-center gap-3'>
                  <img
                    src={user.photoURL || avatarImg}
                    alt='profile'
                    className='w-8 h-8 rounded-full'
                  />
                  <button
                    onClick={logOut}
                    className='px-3 py-1 bg-[#442C2E] text-white rounded hover:bg-[#D6A99D] transition font-semibold'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className='md:hidden relative'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 border border-neutral-200 rounded-full cursor-pointer'
              >
                <AiOutlineMenu size={24} />
              </div>

              {isOpen && (
                <div className='absolute right-0 mt-2 w-52 bg-white shadow-md rounded-lg flex flex-col'>
                  {(user ? linksAfterLogin : linksBeforeLogin).map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-3 hover:bg-neutral-100 font-semibold ${
                          isActive ? 'bg-blue-100 text-blue-600' : ''
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  {!user && (
                    <>
                      <NavLink
                        to='/login'
                        className='px-4 py-3 bg-blue-600 text-white rounded m-2 text-center hover:bg-blue-700 transition font-semibold'
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to='/register'
                        className='px-4 py-3 bg-green-600 text-white rounded m-2 text-center hover:bg-green-700 transition font-semibold'
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </NavLink>
                    </>
                  )}

                  {user && (
                    <button
                      onClick={() => {
                        logOut()
                        setIsOpen(false)
                      }}
                      className='px-4 py-3 text-left bg-[#442C2E] hover:bg-[#D6A99D] font-semibold'
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
