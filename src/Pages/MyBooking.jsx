import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch bookings for the logged-in user
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['mybookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel booking
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this booking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E92C8F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire('Cancelled!', 'Booking cancelled successfully.', 'success');
          }
        });
      }
    });
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading your bookings...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-[#E92C8F]">
        My Confirmed Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found</p>
      ) : (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <table className="w-full min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-pink-600">
              <tr>
                {[
                  'No.',
                  'Service Name',
                  'Type',
                  'Date',
                  'Location',
                  'Price',
                  'Status',
                  'Action',
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                    {booking.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.bookingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">৳ {booking.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.status === 'Paid' ? (
                      <span className="px-2 py-1 rounded-full text-white text-xs bg-green-500">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs text-white bg-yellow-500">
                        {booking.status || 'Pending'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex flex-wrap gap-2">
                    {booking.status !== 'Paid' && (
                      <Link
                        to={`/dashboard/payment/${booking._id}`}
                        className="px-3 py-1 text-white rounded bg-[#E92C8F] hover:bg-[#c22374] transition"
                      >
                        Pay
                      </Link>
                    )}

                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-3 py-1 text-white rounded bg-red-600 hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
