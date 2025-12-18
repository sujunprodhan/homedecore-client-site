import React from 'react';
import { Link } from 'react-router';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/manage-services"
          className="bg-pink-100 p-6 rounded shadow hover:bg-pink-200"
        >
          Manage Services
        </Link>
        <Link
          to="/dashboard/manage-bookings"
          className="bg-pink-100 p-6 rounded shadow hover:bg-pink-200"
        >
          Manage Bookings
        </Link>
        <Link
          to="/dashboard/manage-users"
          className="bg-pink-100 p-6 rounded shadow hover:bg-pink-200"
        >
          Manage Users
        </Link>
        <Link
          to="/dashboard/assign-decorator"
          className="bg-pink-100 p-6 rounded shadow hover:bg-pink-200"
        >
          Assign Decorator
        </Link>
        <Link to="/dashboard/revenue" className="bg-pink-100 p-6 rounded shadow hover:bg-pink-200">
          Revenue & Analytics
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
