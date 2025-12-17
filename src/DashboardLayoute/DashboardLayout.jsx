import { NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-5">
        <h2 className="text-xl font-bold mb-6">Home Decor</h2>

        <nav className="space-y-3">
          {/* User Routes */}
          <NavLink to="/dashboard/my-booking" className="block">
            My Bookings
          </NavLink>

          {/* Admin Routes */}
          <NavLink to="/dashboard/admin-bookings" className="block">
            Admin Booking
          </NavLink>
          {/* Admin Routes */}
          <NavLink to="/dashboard/payment-history" className="block">
            Payment History
          </NavLink>
          <NavLink to="/dashboard/payment-success" className="block">
            Payment Success
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
