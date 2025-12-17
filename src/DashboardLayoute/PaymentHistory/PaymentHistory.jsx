import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Transaction</th>
            <th>Tracking</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>

              <td className="flex items-center gap-2">
                <img src={p.userImage || user.photoURL} className="w-10 h-10 rounded-full" alt="" />
                <span>{user.displayName}</span>
              </td>

              <td>{p.serviceName}</td>
              <td>৳ {p.price}</td>
              <td className="text-xs">{p.transactionId}</td>
              <td>{p.trackingId}</td>
              <td>{new Date(p.paidAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
