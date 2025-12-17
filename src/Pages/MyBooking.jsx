import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

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
      confirmButtonColor: '#3085d6',
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

  // Handle payment
  const handlePay = (id) => {
    Swal.fire({
      title: 'Proceed to Payment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, pay now',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/bookings/pay/${id}`).then((res) => {
          if (res.data.success) {
            refetch();
            Swal.fire('Paid!', 'Booking payment successful.', 'success');
          } else {
            Swal.fire('Error', res.data.message, 'error');
          }
        });
      }
    });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading your bookings...</p>;
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Confirmed Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Service Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.serviceName}</td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.location}</td>
                  <td>৳ {booking.price}</td>
                  <td>
                    {booking.status === 'Paid' ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      booking.status || 'Pending'
                    )}
                  </td>
                  <td className="flex gap-2">
                    {booking.status !== 'Paid' && (
                      <button
                        onClick={() => handlePay(booking._id)}
                        className="btn btn-success btn-xs"
                      >
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-error btn-xs"
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
