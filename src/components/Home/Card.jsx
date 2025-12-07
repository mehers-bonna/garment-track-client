import { Link } from 'react-router'

const Card = ({ product }) => {
  const { _id, name, image, availableQuantity, category, price } = product || {}
  return (
    <Link
      to={`/product/${_id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={image}
            alt='Product Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg text-red-700'>{name}</div>
        <div className='font-semibold text-lg'>Category: {category}</div>
        <div className='font-semibold text-lg'>Available Quantity: {availableQuantity}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'> Price: {price}$</div>
        </div>
        <button className="bg-[#442C2E] text-white px-6 py-2 rounded-md 
        hover:bg-[#D6A99D]">View Details</button>
      </div>
    </Link>
  )
}

export default Card