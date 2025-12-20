import { Link, NavLink, Outlet } from 'react-router';
import {
  FaBook,
  FaCheckCircle,
  FaCreditCard,
  FaTools,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { MdAdminPanelSettings, MdManageAccounts } from 'react-icons/md';
import { TbBrandBooking } from 'react-icons/tb';
import { RiShieldUserFill } from 'react-icons/ri';

import useRole from '../Hooks/useRole';
import { FcManager } from 'react-icons/fc';

const DashBoardLayout = () => {
  const [role] = useRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open w-11/12 mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-7 text-pink-600"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text_primary text-xl font-bold text-pink-600">Home Decor</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* Dashboard link */}
            <li>
              <NavLink
                to="/dashboard/my-booking"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Booking"
              >
                <FaBook size={24} className="text-pink-600" />,
                <span className="is-drawer-close:hidden"> My Booking</span>
              </NavLink>
            </li>
            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                <FaCreditCard size={24} className="text-pink-600" />
                <span className="is-drawer-close:hidden"> Payment History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-success"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment Successful"
              >
                <FaCheckCircle size={24} className="text-pink-600" />
                <span className="is-drawer-close:hidden"> Payment History</span>
              </NavLink>
            </li>

            {/* User Manage */}
            {role === 'admin' && (
              <>
                {/* Approve Booking */}

                <li>
                  <NavLink
                    to="/dashboard/admin-dashboard"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Dashboard"
                  >
                    <FcManager size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Admin Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Booking"
                  >
                    <FaCheckCircle size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Admin Booking</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/decorator-dashboard"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Decorator Dashboard"
                  >
                    <RiShieldUserFill size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Decorator Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Booking"
                  >
                    <TbBrandBooking size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Mange Booking</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-services"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Services"
                  >
                    <MdAdminPanelSettings size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Manage Services</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage User"
                  >
                    <FaUserShield size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> User Management</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/assign-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Decorator"
                  >
                    <FaUsers size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Assign Decorator</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-decorators"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Decorators"
                  >
                    <MdManageAccounts size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Manage Decorators</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/dashboard/revenue"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Revenue Review"
                  >
                    <FaMoneyBillWave size={24} className="text-pink-600" />
                    <span className="is-drawer-close:hidden"> Revenue Review</span>
                  </NavLink>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
