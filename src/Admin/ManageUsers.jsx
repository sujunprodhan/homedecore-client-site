import React, { useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3000/users');
    setUsers(res.data);
  };

  const makeAdmin = async (id) => {
    await axios.patch(`http://localhost:3000/users/admin/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-pink-600">Manage Users</h2>
        <p className="text-gray-500 mt-1">View users and assign admin privileges</p>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'Name', 'Email', 'Role', 'Action'].map((head) => (
                <th
                  key={head}
                  className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-pink-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{u.name || 'N/A'}</td>
                <td className="px-5 py-3 text-gray-600">{u.email}</td>
                <td className="px-5 py-3">
                  {u.role === 'admin' ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Admin
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                      User
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {u.role !== 'admin' ? (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      className="px-4 py-1.5 rounded-lg text-white font-medium
                      bg-gradient-to-r from-pink-500 to-pink-600
                      hover:from-pink-600 hover:to-pink-700
                      shadow-md hover:shadow-lg transition"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
