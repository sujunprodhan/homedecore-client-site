import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Revenue = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get('https://homedecore-server-site.vercel.app/admin/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
    axios
      .get('https://homedecore-server-site.vercel.app/payments')
      .then((res) => setPayments(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Revenue calculation
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const serviceCount = {};
  bookings.forEach((b) => {
    const name = b.serviceName || 'Unknown';
    serviceCount[name] = (serviceCount[name] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(serviceCount),
    datasets: [
      {
        label: 'Number of bookings',
        data: Object.values(serviceCount),
        backgroundColor: 'rgba(233,44,143,0.7)',
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ['Paid', 'Pending', 'Cancelled'],
    datasets: [
      {
        label: 'Booking Status',
        data: [
          bookings.filter((b) => b.status === 'Paid').length,
          bookings.filter((b) => b.status === 'pending').length,
          bookings.filter((b) => b.status === 'Cancelled').length,
        ],
        backgroundColor: ['rgba(34,197,94,0.7)', 'rgba(234,179,8,0.7)', 'rgba(239,68,68,0.7)'],
        borderColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Revenue & Analytics</h1>

      {/* Total Revenue Card */}
      <div className="mb-6 p-6 bg-white shadow-md rounded-xl border border-gray-200">
        <h2 className="font-semibold text-lg text-gray-700">Total Revenue</h2>
        <p className="text-3xl font-bold text-pink-600 mt-2">${totalRevenue.toFixed(2)}</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Bookings by Service</h2>
          <Bar
            data={barData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl border border-gray-200">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Booking Status</h2>
          <Pie
            data={pieData}
            options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
