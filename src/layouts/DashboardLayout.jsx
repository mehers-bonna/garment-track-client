import { Outlet } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar */}
      <Sidebar />

      {/* Right Side: Dashboard Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 bg-[#FEEAE6] z-40 shadow-sm p-4">
          <h1 className="text-xl font-bold text-[#442C2E] text-center">
            Garment Track Dashboard
          </h1>
        </header>

        {/* Main Content */}
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
