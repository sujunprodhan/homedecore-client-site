import React from 'react';
import { Link } from 'react-router';
import { FaTools, FaBook, FaUsers, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';

const AdminDashboard = () => {
  const cards = [
    {
      title: 'Manage Services',
      desc: 'Add, update or remove home decor services',
      to: '/dashboard/manage-services',
      icon: <FaTools />,
    },
    {
      title: 'Manage Bookings',
      desc: 'View and control all customer bookings',
      to: '/dashboard/manage-bookings',
      icon: <FaBook />,
    },
    {
      title: 'Manage Users',
      desc: 'Control users and admin permissions',
      to: '/dashboard/manage-users',
      icon: <FaUsers />,
    },
    {
      title: 'Assign Decorator',
      desc: 'Assign decorators to customer bookings',
      to: '/dashboard/assign-decorator',
      icon: <FaUserTie />,
    },
    {
      title: 'Revenue & Analytics',
      desc: 'Track earnings and business performance',
      to: '/dashboard/revenue',
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E92C8F]">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your platform efficiently from one place</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl text-[#E92C8F] group-hover:scale-110 transition">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
            </div>

            <p className="text-sm text-gray-600">{card.desc}</p>

            <div className="mt-4 text-sm font-medium text-[#E92C8F]">Go to section →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
