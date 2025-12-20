import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FaUsers, FaDollarSign, FaStar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [serviceBookings, setServiceBookings] = useState([]);

  useEffect(() => {
    // Total revenue
    fetch('http://localhost:3000/payments')
      .then((res) => res.json())
      .then((payments) => {
        const revenue = payments.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
        setTotalRevenue(revenue);
      })
      .catch(console.error);

    // Total users
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((users) => setTotalUsers(users.length))
      .catch(console.error);

    // Total reviews
    fetch('http://localhost:3000/reviews')
      .then((res) => res.json())
      .then((reviews) => setTotalReviews(reviews.length))
      .catch(console.error);

    // Service bookings for bar chart
    fetch('http://localhost:3000/admin/bookings')
      .then((res) => res.json())
      .then((bookings) => {
        const counts = {};
        bookings.forEach((b) => {
          counts[b.serviceName] = (counts[b.serviceName] || 0) + 1;
        });
        const chartData = Object.keys(counts).map((key) => ({
          service: key,
          bookings: counts[key],
        }));
        setServiceBookings(chartData);
      })
      .catch(console.error);
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: `৳ ${totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign className="text-pink-600 text-3xl" />,
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <FaUsers className="text-pink-600 text-3xl" />,
    },
    {
      title: 'Total Reviews',
      value: totalReviews,
      icon: <FaStar className="text-pink-600 text-3xl" />,
    },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center gap-4 bg-white shadow-md p-6 rounded-lg border-2 border-pink-500"
          >
            <div>{stat.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-700">{stat.title}</h3>
              <p className="text-2xl font-bold text-pink-600 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Service Bookings Bar Chart ===== */}
      <div className="card bg-white shadow-md p-6 rounded-lg border-2 border-pink-500">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Service Bookings</h2>
        {serviceBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={serviceBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#ec4899" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
