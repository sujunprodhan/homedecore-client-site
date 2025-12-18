import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/bookings');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">All Bookings</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr className='text-pink-600'>
            <th>No.</th>
            <th>User Email</th>
            <th>Service</th>
            <th>Status</th>
            <th>Price</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id}>
              <td>{i + 1}</td>
              <td>{b.email}</td>
              <td>{b.serviceName}</td>
              <td>{b.status}</td>
              <td>৳ {b.price}</td>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
