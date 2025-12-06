import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';
import Banner from '../components/Banner/Banner';
import BrandsSection from '../components/BrandSection/BrandSection';
import TeamSection from '../components/TeamSection/TeamSection';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/'; // home path check

  return (
    <div>
      <Navbar />

      {isHome && (
        <div className='my-10'>
          <Banner />
        </div>
      )}

      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>

      {isHome && (
        <div className='w-9/12 mx-auto'>
          <BrandsSection />
        </div>
      )}

      {isHome && <TeamSection />}

      <Footer />
    </div>
  );
};

export default MainLayout;
