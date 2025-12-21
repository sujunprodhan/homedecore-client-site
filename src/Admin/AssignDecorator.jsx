import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);


  const fetchBookings = async () => {
    try {
      const res = await axios.get('https://homedecore-server-site.vercel.app/admin/bookings');
      setBookings(res.data.filter((b) => b.status === 'Paid'));
    } catch (err) {
      console.error(err);
    }
  };

  // Decorators
  const fetchDecorators = async () => {
    try {
      const res = await axios.get('https://homedecore-server-site.vercel.app/admin/decorators');
      setDecorators(res.data.filter((d) => d.status === 'active'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchDecorators();
  }, []);

  const assignDecorator = async (bookingId, decoratorEmail) => {
    if (!decoratorEmail) return;

    try {
      await axios.patch(`https://homedecore-server-site.vercel.app/admin/bookings/${bookingId}`, {
        assignedDecorator: decoratorEmail,
      });
      Swal.fire('Success', 'Decorator assigned successfully', 'success');
      fetchBookings();
    } catch (err) {
      Swal.fire('Error', 'Failed to assign decorator', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Assign Decorator</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'User Email', 'Service', 'Assigned Decorator', 'Assign Decorator'].map(
                (head) => (
                  <th key={head} className="px-5 py-3 text-left text-sm font-semibold uppercase">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((b, i) => (
              <tr key={b._id} className="hover:bg-pink-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3">{b.email}</td>
                <td className="px-5 py-3">{b.serviceName}</td>
                <td className="px-5 py-3">{b.assignedDecorator || 'Not Assigned'}</td>
                <td className="px-5 py-3">
                  <select
                    defaultValue={b.assignedDecorator || ''}
                    onChange={(e) => assignDecorator(b._id, e.target.value)}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="" disabled>
                      Select Decorator
                    </option>
                    {decorators.map((d) => (
                      <option key={d.email} value={d.email}>
                        {d.name} ({d.email})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No paid bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignDecorator;
