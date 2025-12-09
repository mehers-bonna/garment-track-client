import { Link } from 'react-router' // ✅ FIX: Link component must be imported from 'react-router-dom'
import Products from '../../components/Home/Products'

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-8 mb-2'>Our Products</h1>

      <div>
        {/* Products.jsx call /products/featured API as limit={6} is provided */}
        <Products limit={6} />
      </div>

      {/* Centered Button */}
      <div className="text-center mb-10">
        <Link
          to="/all-products"
          className="bg-[#442C2E] text-white px-6 py-2 rounded-md 
                     hover:bg-[#D6A99D] "
        >
          View All
        </Link>
      </div>
    </div>
  )
}

export default Home