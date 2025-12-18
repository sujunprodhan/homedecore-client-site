import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignDecorator = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get('http://localhost:3000/admin/bookings');
      setBookings(res.data.filter((b) => b.status === 'Paid'));
    };
    const fetchDecorators = async () => {
      const res = await axios.get('http://localhost:3000/users');
      setDecorators(res.data.filter((u) => u.role === 'decorator'));
    };
    fetchBookings();
    fetchDecorators();
  }, []);

  const assignDecorator = async (bookingId, decoratorEmail) => {
    await axios.patch(`http://localhost:3000/admin/bookings/${bookingId}`, {
      assignedDecorator: decoratorEmail,
    });
    alert('Decorator Assigned!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Assign Decorator</h2>

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-pink-600 text-white">
            <th>No.</th>
            <th>User Email</th>
            <th>Service</th>
            <th>Assign Decorator</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td>{i + 1}</td>
              <td>{b.email}</td>
              <td>{b.serviceName}</td>
              <td>
                <select
                  onChange={(e) => assignDecorator(b._id, e.target.value)}
                  className="border p-2"
                >
                  <option>Select Decorator</option>
                  {decorators.map((d) => (
                    <option key={d.email} value={d.email}>
                      {d.name} ({d.email})
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignDecorator;
