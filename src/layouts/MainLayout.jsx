import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <Navbar />

      {/* Main content area */}
      <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;