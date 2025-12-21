import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  const handleUpdate = (booking) => {
    Swal.fire({
      title: 'Update Booking',
      html: `
        <input id="date" type="date" class="swal2-input" value="${booking.bookingDate}" />
        <input id="location" type="text" class="swal2-input" placeholder="Location" value="${booking.location}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#E92C8F',
      preConfirm: () => {
        const bookingDate = document.getElementById('date').value;
        const location = document.getElementById('location').value;

        if (!bookingDate || !location) {
          Swal.showValidationMessage('Both fields are required');
        }

        return { bookingDate, location };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/bookings/${booking._id}`, result.value).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire('Updated!', 'Booking updated successfully.', 'success');
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
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-[1000px] w-full table-auto border-collapse">
            <thead className="bg-gray-100">
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
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-pink-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{booking.serviceName}</td>
                  <td className="px-6 py-4">{booking.serviceType}</td>
                  <td className="px-6 py-4">{booking.bookingDate}</td>
                  <td className="px-6 py-4">{booking.location}</td>
                  <td className="px-6 py-4 font-semibold">৳ {booking.price}</td>

                  <td className="px-6 py-4">
                    {booking.status === 'Paid' ? (
                      <span className="px-2 py-1 rounded-full text-xs text-white bg-green-500">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs text-white bg-yellow-500">
                        {booking.status || 'Pending'}
                      </span>
                    )}
                  </td>

                  {/* Sticky Action */}
                  <td className="px-6 py-4 sticky right-0 bg-white z-10">
                    {booking.status !== 'Paid' && (
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/payment/${booking._id}`}
                          className="px-3 py-1 text-white rounded bg-[#d80673] hover:bg-[#ff0084]"
                        >
                          Pay
                        </Link>

                        <button
                          onClick={() => handleUpdate(booking)}
                          className="px-3 py-1 text-pink-600 rounded bg-[#00daf7e7] hover:bg-[#03817b]"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="px-3 py-1 text-white rounded bg-red-600 hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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
