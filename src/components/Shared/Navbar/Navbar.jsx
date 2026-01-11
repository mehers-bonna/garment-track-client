import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/avatarImg.png'
import logo from '../../../assets/gtLogo.PNG'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  // Theme Logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

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
    { name: 'Help/Support', path: '/help-support' },
    { name: 'Privacy/Terms', path: '/privacy-terms' },
  ]

  const handleLogOut = async () => {
    try {
      await logOut()
      setIsOpen(false)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    /* Full-width background with Dark support */
    <div className='sticky top-0 w-full bg-[#FEEAE6] dark:bg-[#1a1a1a] z-50 shadow-sm border-b border-[#fcd5ce] dark:border-gray-800 transition-colors duration-300'>
      <div className='py-4 w-9/12 mx-auto'>
        <div className='flex items-center justify-between'>
          
          {/* Logo & Theme Toggle Section */}
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center'>
              <NavLink to='/'>
                <img src={logo} alt='logo' width='50' height='50' className='rounded-full' />
              </NavLink>
              <NavLink to='/' className='text-2xl font-bold text-[#442C2E] dark:text-[#FEEAE6]'>GarmentTrack</NavLink>
            </div>

            {/* TravelEase Style Theme Toggle */}
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
              className="toggle toggle-sm ml-2"
            />
          </div>

          {/* Desktop Links & Profile Menu */}
          <div className='hidden md:flex items-center gap-6'>
            {(user ? linksAfterLogin : linksBeforeLogin).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-semibold relative group hover:text-[#442C2E] dark:hover:text-[#D6A99D] transition-colors ${
                    isActive ? 'text-[#442C2E] dark:text-[#D6A99D]' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {/* Link Name */}
                {link.name}

                {/* Smooth Animated Underline Logic */}
                <span 
                  className={({ isActive }) => 
                    `absolute left-0 bottom-[-4px] h-[2px] bg-[#442C2E] dark:bg-[#D6A99D] transition-all duration-300 ease-in-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                 
                >
                  <span className={`absolute left-0 bottom-[-4px] h-[2px] bg-[#442C2E] dark:bg-[#D6A99D] transition-all duration-300 ${
                    
                    window.location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
                
                {/* Refined Underline logic for React Router NavLink */}
                <span className={`absolute left-0 bottom-[-4px] h-[2.5px] bg-[#442C2E] dark:bg-[#D6A99D] transition-all duration-300 
                  ${({ isActive }) => isActive ? 'w-full' : 'w-0 group-hover:w-full' }`}>
                </span>

                {/* Final Clean Implementation of Underline */}
                <div className="absolute left-0 -bottom-1 w-full h-[2px] overflow-hidden">
                    <div className={`h-full bg-[#442C2E] dark:bg-[#D6A99D] transition-transform duration-300 transform origin-left
                        ${window.location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                    />
                </div>
              </NavLink>
            ))}

            <div className='relative ml-4'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 p-1 border border-[#442C2E]/20 rounded-full cursor-pointer hover:shadow-md transition bg-white dark:bg-[#2a2a2a] dark:border-gray-700'
              >
                <AiOutlineMenu className='ml-2 text-[#442C2E] dark:text-gray-300' size={20} />
                <img
                  src={user?.photoURL || avatarImg}
                  alt='profile'
                  className='w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600'
                />
              </div>

              {isOpen && (
                <div className='absolute right-0 mt-3 w-56 bg-white dark:bg-[#1a1a1a] shadow-xl rounded-2xl py-3 flex flex-col border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200'>
                  {!user ? (
                    <div className='flex flex-col gap-2 p-2'>
                      <NavLink
                        to='/login'
                        className='px-6 py-2 bg-[#442C2E] text-white rounded-lg text-center font-semibold hover:bg-[#D6A99D] transition'
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to='/register'
                        className='px-6 py-2 bg-[#442C2E] text-white rounded-lg text-center font-semibold hover:bg-[#D6A99D] transition'
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </NavLink>
                    </div>
                  ) : (
                    <>
                      <div className='px-6 py-2 border-b border-gray-100 dark:border-gray-700 mb-2'>
                        <p className='text-sm text-gray-500'>Welcome,</p>
                        <p className='font-bold text-[#442C2E] dark:text-[#FEEAE6] truncate'>{user?.displayName || 'User'}</p>
                      </div>
                      <NavLink
                        to='/dashboard'
                        className='px-6 py-3 hover:bg-lime-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold'
                        onClick={() => setIsOpen(false)}
                      >
                        My Dashboard
                      </NavLink>
                      <div className='p-2'>
                        <button
                          onClick={handleLogOut}
                          className='w-full px-6 py-2 bg-[#442C2E] text-white rounded-lg text-left font-bold hover:bg-[#D6A99D] transition'
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className='md:hidden flex items-center gap-3'>
             <div onClick={() => setIsOpen(!isOpen)} className='p-2 cursor-pointer text-[#442C2E] dark:text-gray-300'>
                <AiOutlineMenu size={28} />
             </div>
             {isOpen && (
                <div className='absolute right-4 top-16 w-52 bg-white dark:bg-[#1a1a1a] shadow-lg rounded-xl py-2 border border-gray-100 dark:border-gray-700 flex flex-col z-[60]'>
                    {(user ? linksAfterLogin : linksBeforeLogin).map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            onClick={() => setIsOpen(false)}
                            className='px-4 py-2 hover:bg-lime-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold'
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    {!user ? (
                        <div className='flex flex-col gap-2 p-2'>
                            <NavLink to='/login' className='bg-[#442C2E] text-white py-2 text-center rounded-lg' onClick={() => setIsOpen(false)}>Login</NavLink>
                            <NavLink to='/register' className='bg-[#442C2E] text-white py-2 text-center rounded-lg' onClick={() => setIsOpen(false)}>Register</NavLink>
                        </div>
                    ) : (
                        <div className='p-2'>
                             <button onClick={handleLogOut} className='w-full bg-[#442C2E] text-white py-2 rounded-lg'>Logout</button>
                        </div>
                    )}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar