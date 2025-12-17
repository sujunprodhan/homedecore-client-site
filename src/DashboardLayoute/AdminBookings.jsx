import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AdminBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure.get('/dashboard/admin/bookings').then((res) => setBookings(res.data));
  }, []);

  const updateStatus = (id, status) => {
    axiosSecure.patch(`/admin/bookings/${id}`, { status });
    setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Bookings</h2>

      {bookings.map((b) => (
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
      ))}
    </div>
  );
};

export default AdminBookings;