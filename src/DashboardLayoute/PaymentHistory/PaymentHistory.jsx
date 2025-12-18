import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // Format currency in professional style
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(amount);

  // Format date in professional readable format
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (isLoading) return <p className="text-center py-10">Loading payment history...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Failed to load payment history.</p>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">
        Payment History <span className="text-pink-600">({payments.length})</span>
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">Payment history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-pink-600">No.</th>
                <th className="text-pink-600">Service</th>
                <th className="text-pink-600">Amount</th>
                <th className="text-pink-600">Transaction ID</th>
                <th className="text-pink-600">Tracking ID</th>
                <th className="text-pink-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.serviceName}</td>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td className="text-xs break-all">{payment.transactionId}</td>
                  <td>{payment.trackingId || '-'}</td>
                  <td>{formatDate(payment.paidAt)}</td>
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
