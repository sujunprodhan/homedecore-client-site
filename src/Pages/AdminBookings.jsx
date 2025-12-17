import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

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
          // Update UI
          setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="border p-4 mb-3">
            <p>
              {b.serviceName} - {b.email}
            </p>
            <p>Status: {b.status}</p>

            <button
              onClick={() => updateStatus(b._id, 'approved')}
              className="mr-2 bg-green-500 text-white px-3 py-1"
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(b._id, 'rejected')}
              className="bg-red-500 text-white px-3 py-1"
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookings;
