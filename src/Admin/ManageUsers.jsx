import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://homedecore-server-site.vercel.app/users');

      const sortedUsers = res.data.sort((a, b) => {
        if (a.email === user?.email) return -1;
        if (b.email === user?.email) return 1;
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        return 0;
      });

      setUsers(sortedUsers);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUsers();
    }
  }, [user]);

  const makeAdmin = async (id) => {
    try {
      await axios.patch(`https://homedecore-server-site.vercel.app/users/admin/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to make admin', error);
    }
  };

  const convertToUser = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This admin will be converted to a user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899', 
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, convert!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.patch(`https://homedecore-server-site.vercel.app/users/user/${id}`);
        Swal.fire('Converted!', 'The admin has been converted to a user.', 'success');
        fetchUsers();
      } catch (error) {
        Swal.fire('Error!', 'Failed to convert admin to user', 'error');
      }
    }
  };

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-pink-600">Manage Users</h2>
          <p className="text-gray-500 mt-1">View users and assign admin privileges</p>
        </div>
        <div className="text-gray-700 font-medium">
          Total Users: <span className="font-bold">{users.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow border-2 border-pink-200">
        <table className="min-w-full w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'User', 'Email', 'Role', 'Action'].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide border-b border-pink-300"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-200">
            {users.map((u, i) => (
              <tr
                key={u._id}
                className={`hover:bg-pink-50 transition-all ${
                  u.email === user?.email ? 'bg-green-50' : ''
                }`}
              >
                <td className="px-6 py-4 border-b border-pink-200">{i + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3 border-b border-pink-200">
                  <img
                    src={u.photoURL || '/default-user.png'}
                    alt={u.name || u.email}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {u.name || 'N/A'}
                    {u.email === user?.email && (
                      <span className="ml-2 text-xs text-green-600 font-semibold">(You)</span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-pink-200">{u.email}</td>
                <td className="px-6 py-4 border-b border-pink-200">
                  {u.role === 'admin' ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Admin
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                      User
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 border-b border-pink-200 flex gap-2">
                  {u.role !== 'admin' && u.email !== user?.email && (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      className="px-4 py-2 text-sm rounded-md bg-pink-500 text-white hover:bg-pink-600 transition"
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role === 'admin' && u.email !== user?.email && (
                    <button
                      onClick={() => convertToUser(u._id)}
                      className="px-4 py-2 text-sm rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
                    >
                      Convert to User
                    </button>
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
