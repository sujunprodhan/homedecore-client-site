import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageDecorators = () => {
  const [decorators, setDecorators] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchDecorators = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/decorators');
      setDecorators(res.data);
    } catch (err) {
      console.error('Failed to fetch decorators', err);
    }
  };

  useEffect(() => {
    fetchDecorators();
  }, []);

  const addDecorator = async () => {
    if (!name || !email) return;

    try {
      await axios.post('http://localhost:3000/admin/decorators', { name, email });
      Swal.fire('Success', 'Decorator added successfully', 'success');
      setName('');
      setEmail('');
      fetchDecorators();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to add decorator', 'error');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/admin/decorators/${id}`, { status });
      fetchDecorators();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDecorator = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/decorators/${id}`);
      fetchDecorators();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Manage Booking</h2>

      {/* Add Decorator */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-1/3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-1/3"
        />
        <button onClick={addDecorator} className="bg-pink-600 text-white px-4 py-2 rounded">
          Add Decorator
        </button>
      </div>

      {/* Decorators Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-[600px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'Name', 'Email', 'Status', 'Action'].map((head) => (
                <th key={head} className="px-5 py-3 text-left text-sm font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {decorators.map((d, i) => (
              <tr key={d._id} className="hover:bg-pink-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3">{d.name}</td>
                <td className="px-5 py-3">{d.email}</td>
                <td className="px-5 py-3 capitalize">{d.status || 'active'}</td>
                <td className="px-5 py-3 flex gap-2">
                  {d.status === 'active' ? (
                    <button
                      onClick={() => updateStatus(d._id, 'disabled')}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(d._id, 'active')}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => deleteDecorator(d._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {decorators.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No decorators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDecorators;
