import { Outlet } from 'react-router'
// import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Navbar from '../components/Shared/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='my-10'>
        <Banner></Banner>
      </div>
      <div className=' min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout