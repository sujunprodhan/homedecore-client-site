import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:3000/admin/bookings');
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`http://localhost:3000/admin/bookings/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Manage Bookings</h2>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-pink-600 text-white">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">User Email</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Booking Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{b.email}</td>
              <td className="border px-4 py-2">{b.serviceName}</td>
              <td className="border px-4 py-2">{b.status}</td>
              <td className="border px-4 py-2">{b.price}</td>
              <td className="border px-4 py-2">{new Date(b.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">
                {b.status !== 'Paid' && (
                  <button
                    onClick={() => updateStatus(b._id, 'Paid')}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
