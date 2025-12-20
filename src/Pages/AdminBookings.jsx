import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure
      .get('/admin/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    axiosSecure
      .patch(`/admin/bookings/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));

          Swal.fire({
            icon: status === 'approved' ? 'success' : 'error',
            title: status === 'approved' ? 'Booking Approved' : 'Booking Rejected',
            text:
              status === 'approved'
                ? 'You have successfully approved this booking.'
                : 'You have rejected this booking.',
            confirmButtonColor: '#ec4899',
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Admin Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Service Name + Image */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  {b.image && (
                    <img
                      src={b.image}
                      alt={b.serviceName}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">{b.serviceName}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    b.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : b.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-pink-100 text-pink-700'
                  }`}
                >
                  {(b.status || 'pending').charAt(0).toUpperCase() +
                    (b.status || 'pending').slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{b.email}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(b._id, 'approved')}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-semibold transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(b._id, 'rejected')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-semibold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
