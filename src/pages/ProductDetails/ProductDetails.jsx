import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import OrderModal from '../../components/Modal/OrderModal'
import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'

const ProductDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/products/${id}`)
      return result.data
    },
  })

  const closeModal = () => {
    setIsOpen(false)
  }

  // Order button handler
  const handleOrderClick = () => {
    if (user && user.email) {
      setIsOpen(true)
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  
  const { image, name, description, category, manager, availableQuantity, price, minimumOrderQuantity, paymentOptions } = product

  return (
    <Container>
      <div className='w-8/12 mx-auto flex flex-col lg:flex-row justify-between gap-1 mt-30'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-[400px] rounded-2xl'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div className='text-lg font-light text-neutral-500'>
            {description}
          </div>
          <hr className='my-6' />

          <div className='text-xl font-semibold flex flex-row items-center gap-2'>
            <div>Manager: {manager?.name}</div>
            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={manager?.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p className='gap-4 font-light text-neutral-500'>
              Available Quantity: {availableQuantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div>
            <p className='gap-4 font-light text-neutral-500'>
              Minimum Order Quantity: {minimumOrderQuantity} Units.
            </p>
          </div>
          <hr className='my-6' />
          <div>
            <p className='gap-4 font-light text-neutral-500'>
              Payment Option: {paymentOptions}
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button onClick={handleOrderClick} label='Order' />
            </div>
          </div>
          <hr className='my-6' />

          <OrderModal product={product} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails