import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ---------------- Fetch bookings with polling ----------------
  useEffect(() => {
    const fetchBookings = () => {
      axiosSecure
        .get('/admin/bookings')
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    };

    fetchBookings(); // initial fetch
    const interval = setInterval(fetchBookings, 5000); // refresh every 5s

    return () => clearInterval(interval); // cleanup
  }, [axiosSecure]);

  // ---------------- Update booking status ----------------
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

  // ---------------- Filter bookings by search term ----------------
  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.userName && b.userName.toLowerCase().includes(term)) ||
      (b.userEmail && b.userEmail.toLowerCase().includes(term)) ||
      (b.serviceName && b.serviceName.toLowerCase().includes(term))
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Admin Bookings</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email, name, or service..."
          className="w-full md:w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bookings */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Service + Image */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  {b.image && (
                    <img
                      src={b.image}
                      alt={b.serviceName}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{b.serviceName}</h3>
                    {b.userName && <p className="text-gray-500 text-sm">{b.userName}</p>}
                  </div>
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

              <p className="text-gray-600 mb-4">{b.userEmail}</p>

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
