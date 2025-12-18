import { NavLink, Outlet } from 'react-router';
import { FaBook, FaHistory, FaCheckCircle, FaUsers } from 'react-icons/fa';

const DashboardLayout = () => {
  const menuItems = [
    { name: 'My Bookings', to: '/dashboard/my-booking', icon: <FaBook /> },
    { name: 'Admin Booking', to: '/dashboard/admin-bookings', icon: <FaUsers /> },
    { name: 'Payment History', to: '/dashboard/payment-history', icon: <FaHistory /> },
    { name: 'Payment Success', to: '/dashboard/payment-success', icon: <FaCheckCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#E92C8F]">Home Decor</h2>

        <nav className="flex flex-col gap-3 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group ${
                  isActive ? 'bg-[#E92C8F] text-white' : 'text-gray-700 hover:bg-pink-100'
                }`
              }
              title={item.name} // tooltip text on hover
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden group-hover:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
