import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:3000/admin/bookings');
    setBookings(res.data.filter((b) => b.status === 'Paid'));
  };

  const fetchDecorators = async () => {
    const res = await axios.get('http://localhost:3000/users');
    setDecorators(res.data.filter((u) => u.role === 'decorator'));
  };

  useEffect(() => {
    fetchBookings()
    fetchDecorators()
  }, []);

  const assignDecorator = async (bookingId, decoratorEmail) => {
    if (!decoratorEmail) return;
    try {
      await axios.patch(`http://localhost:3000/admin/bookings/${bookingId}`, {
        assignedDecorator: decoratorEmail,
      });
      Swal.fire({
        icon: 'success',
        title: 'Assigned!',
        text: `Decorator assigned successfully.`,
        confirmButtonColor: '#E92C8F',
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to assign decorator.',
        confirmButtonColor: '#E92C8F',
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-pink-600">Assign Decorator</h2>
        <p className="text-gray-500 mt-1">Assign decorators to confirmed bookings</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'User Email', 'Service', 'Assign Decorator'].map((head) => (
                <th
                  key={head}
                  className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {bookings.map((b, i) => (
              <tr key={b._id} className="hover:bg-pink-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3 text-gray-700">{b.email}</td>
                <td className="px-5 py-3 font-medium">{b.serviceName}</td>
                <td className="px-5 py-3">
                  <select
                    onChange={(e) => assignDecorator(b._id, e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                    defaultValue=""
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
                <td colSpan="4" className="text-center py-10 text-gray-500">
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
