import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // Common Login Function for both Form and Demo Buttons
  const loginAction = async (email, password) => {
    try {
      const { user } = await signIn(email, password)
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
      setLoading(false)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value
    await loginAction(email, password)
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300 py-10'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-[#FEEAE6] shadow-2xl border dark:border-gray-800 transition-colors duration-300'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Login Now!</h1>
          <p className='text-sm text-gray-400 dark:text-gray-500'>
            Log In to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white transition-colors'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white transition-colors'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-[#442C2E] hover:bg-[#D6A99D] dark:hover:bg-[#442C2E]/80 w-full rounded-md py-3 text-white transition-colors font-semibold'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Section */}
        <div className='mt-6 space-y-2'>
          <p className='text-center text-xs font-semibold uppercase text-gray-500'>Demo Accounts</p>
          <div className='grid grid-cols-3 gap-2'>
            <button
              onClick={() => loginAction('admin1@gmail.com', 'Admin1@gmail.com')}
              className='text-[10px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 py-2 rounded-md hover:bg-red-200 transition font-bold'
            >
              ADMIN
            </button>
            <button
              onClick={() => loginAction('manager1@gmail.com', 'Manager1@gmail.com')}
              className='text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 py-2 rounded-md hover:bg-blue-200 transition font-bold'
            >
              MANAGER
            </button>
            <button
              onClick={() => loginAction('test1@gmail.com', 'Test1@gmail.com')}
              className='text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 py-2 rounded-md hover:bg-green-200 transition font-bold'
            >
              BUYER
            </button>
          </div>
        </div>

        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-200 dark:bg-gray-700'></div>
          <p className='px-3 text-sm text-gray-400 dark:text-gray-500'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-200 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors'
        >
          <FcGoogle size={32} />
          <p className='dark:text-gray-300 font-medium'>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400 dark:text-gray-500'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/register'
            className='hover:underline hover:text-[#442C2E] dark:hover:text-[#D6A99D] text-gray-600 dark:text-gray-400 transition-colors font-semibold'
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login