import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import Footer from '../components/Shared/Footer/Footer';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white dark:bg-[#121212] text-gray-900 dark:text-[#FEEAE6] transition-colors duration-300">
      
      {/* Left Side: Sidebar */}
      <Sidebar />

      {/* Right Side: Dashboard Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 bg-[#FEEAE6] dark:bg-[#1a1a1a] z-40 shadow-sm p-4 border-b dark:border-gray-800">
          <h1 className="text-xl font-bold text-[#442C2E] dark:text-[#FEEAE6] text-center">
            Garment Track Dashboard
          </h1>
        </header>

        {/* Main Content */}
        <main className="p-5 flex-1 min-h-[calc(100vh-140px)]">
          <Outlet />
        </main>

        <footer className="dark:bg-[#121212]">
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;