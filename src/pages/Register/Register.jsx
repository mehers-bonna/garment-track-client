import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form';
import { imageUpload, saveOrUpdateUser } from '../../utils';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { name, image, email, password, role } = data
    const status = 'pending';
    const imageFile = image[0]

    try {
      const imageURL = await imageUpload(imageFile)
      const result = await createUser(email, password)
      await updateUserProfile(name, imageURL)

      const userDataToSave = {
        name,
        email,
        image: imageURL,
        role,
        status: status,
      };

      await saveOrUpdateUser(userDataToSave)
      console.log(result)
      navigate(from, { replace: true })
      toast.success('Registered Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
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
      toast.success('Registered Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300 -mt-10 mb-10'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white dark:bg-[#1a1a1a] shadow-2xl text-gray-900 dark:text-[#FEEAE6] border dark:border-gray-800 transition-colors duration-300'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register Now!</h1>
          <p className='text-sm text-gray-400 dark:text-gray-500'>Welcome to GarmentTrack</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Profile Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500 dark:text-gray-400
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-[#D6A99D] file:text-[#442C2E]
      hover:file:bg-lime-100
      bg-gray-100 dark:bg-[#2a2a2a] border border-dashed border-[#442C2E] rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-[#442C2E] focus:border-[#442C2E]
      py-2'
                {...register('image')}
              />
              <p className='mt-1 text-xs text-gray-400 dark:text-gray-500'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white"
                {...register('role', { required: 'Role is required' })}
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <input type="hidden" name="status" value="pending" />

            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                {...register('email', { required: 'Email is required' })}
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
                autoComplete='new-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-[#442C2E] bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.',
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-[#442C2E] hover:bg-[#D6A99D] dark:hover:bg-[#442C2E]/80 w-full rounded-md py-3 text-white transition-colors'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-200 dark:bg-gray-700'></div>
          <p className='px-3 text-sm text-gray-400 dark:text-gray-500'>
            Register with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-200 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors'
        >
          <FcGoogle size={32} />
          <p className='dark:text-gray-300'>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400 dark:text-gray-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-[#442C2E] dark:hover:text-[#D6A99D] text-gray-600 dark:text-gray-400'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
};

export default Register;