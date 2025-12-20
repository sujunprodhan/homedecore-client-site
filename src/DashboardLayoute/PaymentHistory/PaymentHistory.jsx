import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useState } from 'react';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState('');

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to load payment history.');
        return [];
      }
    },
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (isLoading) return <p className="text-center py-10">Loading payment history...</p>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">
        Payment History <span className="text-pink-600">({payments.length})</span>
      </h2>

      {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Tracking ID</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{payment.serviceName}</td>
                  <td className="px-4 py-2">{formatCurrency(payment.price)}</td>
                  <td className="px-4 py-2 text-xs break-all">{payment.transactionId}</td>
                  <td className="px-4 py-2">{payment.trackingId || '-'}</td>
                  <td className="px-4 py-2">{formatDate(payment.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
