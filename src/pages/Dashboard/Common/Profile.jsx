import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/coverGt.jpg'
import useRole from '../../../hooks/useRole'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, logOut } = useAuth()
  const [role, isRoleLoading] = useRole()
  const navigate = useNavigate()

  console.log(role, isRoleLoading)
  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Successfully logged out!')
      navigate('/')
    } catch (error) {
      console.error("Logout Error:", error)
      toast.error('Logout failed.')
    }
  }


  return (
    <div className='flex justify-center items-center h-screen transition-colors duration-300'>
      <div className='bg-white dark:bg-[#1a1a1a] shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 border dark:border-gray-800 transition-colors duration-300'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56 object-cover'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white dark:border-gray-800'
            />
          </a>

          {isRoleLoading ? (
            <p className='p-2 px-4 text-xs text-white bg-gray-500 rounded-full mt-2'>Loading...</p>
          ) : (
            <p className='p-2 px-4 text-xs text-white bg-[#D6A99D] rounded-full mt-2 uppercase font-semibold'>
              {role}
            </p>
          )}
          
          <p className='mt-4 text-xl font-medium text-gray-800 dark:text-gray-200'>
            User Id: <span className='text-sm text-gray-500 dark:text-gray-400'>{user?.uid}</span>
          </p>

          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-4'>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-gray-800 dark:text-gray-200'>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-gray-800 dark:text-gray-200'>{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={handleLogout} 
                  className='bg-[#442C2E] dark:bg-[#5c3e40] px-7 py-2 rounded-lg text-white cursor-pointer hover:bg-[#D6A99D] dark:hover:bg-[#8d6a6d] font-semibold transition duration-200'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile