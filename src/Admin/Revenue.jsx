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
    // Fetch bookings
    axios
      .get('http://localhost:3000/admin/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));

    // Fetch payments
    axios
      .get('http://localhost:3000/payments')
      .then((res) => setPayments(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Revenue calculation
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  // Booking count per service (histogram)
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
        backgroundColor: 'rgba(233,44,143,0.6)',
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
        backgroundColor: ['rgba(34,197,94,0.6)', 'rgba(234,179,8,0.6)', 'rgba(239,68,68,0.6)'],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Revenue & Analytics</h1>

      <div className="mb-6 p-4 bg-white shadow rounded">
        <h2 className="font-semibold text-lg">Total Revenue</h2>
        <p className="text-xl mt-2">${totalRevenue.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold text-lg mb-4">Bookings by Service (Histogram)</h2>
          <Bar data={barData} />
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold text-lg mb-4">Booking Status</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
