import React, {useState } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:3000/admin/bookings');
    setBookings(res.data);
  };

  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`http://localhost:3000/admin/bookings/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-pink-600">Manage Bookings</h2>
        <p className="text-gray-500 mt-1">View and control all customer bookings</p>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'User Email', 'Service', 'Status', 'Price', 'Booking Date', 'Action'].map(
                (head) => (
                  <th
                    key={head}
                    className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                  >
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
                <td className="px-5 py-3 text-gray-700">{b.email}</td>
                <td className="px-5 py-3 font-medium">{b.serviceName}</td>

                <td className="px-5 py-3">
                  {b.status === 'Paid' ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="px-5 py-3 font-semibold">৳ {b.price}</td>

                <td className="px-5 py-3 text-sm text-gray-600">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-3">
                  {b.status !== 'Paid' && (
                    <button
                      onClick={() => updateStatus(b._id, 'Paid')}
                      className="px-4 py-1.5 rounded-lg text-white font-medium
                      bg-gradient-to-r from-pink-500 to-pink-600
                      hover:from-pink-600 hover:to-pink-700
                      shadow-md hover:shadow-lg transition"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
