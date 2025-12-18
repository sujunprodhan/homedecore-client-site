import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3000/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    await axios.patch(`http://localhost:3000/users/admin/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Manage Users</h2>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-pink-600 text-white">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">
                {u.role !== 'admin' && (
                  <button
                    onClick={() => makeAdmin(u._id)}
                    className="bg-pink-600 text-white px-3 py-1 rounded"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
