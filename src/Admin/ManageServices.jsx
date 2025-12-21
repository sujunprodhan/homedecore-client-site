import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({
    service_name: '',
    cost: '',
    unit: '',
    service_category: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await axios.get('https://homedecore-server-site.vercel.app/admin/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add or Update service
  const handleSaveService = async () => {
    try {
      if (
        !newService.service_name ||
        !newService.cost ||
        !newService.unit ||
        !newService.service_category
      ) {
        Swal.fire('Error', 'Please fill all required fields', 'error');
        return;
      }

      if (editingId) {
        await axios.patch(
          `https://homedecore-server-site.vercel.app/admin/services/${editingId}`,
          newService
        );
        Swal.fire('Updated', 'Service updated successfully', 'success');
      } else {
        await axios.post('https://homedecore-server-site.vercel.app/admin/services', newService);
        Swal.fire('Added', 'Service added successfully', 'success');
      }

      setNewService({
        service_name: '',
        cost: '',
        unit: '',
        service_category: '',
        description: '',
      });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to save service', 'error');
    }
  };

  // Edit service
  const handleEdit = (service) => {
    setNewService({
      service_name: service.service_name,
      cost: service.cost,
      unit: service.unit,
      service_category: service.service_category,
      description: service.description,
    });
    setEditingId(service._id);
  };

  // Delete service
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the service',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://homedecore-server-site.vercel.app/admin/services/${id}`);
        Swal.fire('Deleted!', 'Service has been deleted.', 'success');
        fetchServices();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete service', 'error');
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading services...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-pink-600">Manage Services</h2>
        <p className="text-gray-500 mt-1">Add, view and manage all available services</p>
      </div>

      {/* Add/Edit Service Card */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Service Name"
            value={newService.service_name}
            onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            placeholder="Cost"
            type="number"
            value={newService.cost}
            onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            placeholder="Unit"
            value={newService.unit}
            onChange={(e) => setNewService({ ...newService, unit: e.target.value })}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            placeholder="Category"
            value={newService.service_category}
            onChange={(e) => setNewService({ ...newService, service_category: e.target.value })}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 md:col-span-2"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSaveService}
            className="px-6 py-2 rounded-lg text-white font-medium
            bg-gradient-to-r from-pink-500 to-pink-600
            hover:from-pink-600 hover:to-pink-700
            shadow-md hover:shadow-lg transition"
          >
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewService({
                  service_name: '',
                  cost: '',
                  unit: '',
                  service_category: '',
                  description: '',
                });
              }}
              className="ml-4 px-4 py-2 rounded-lg text-white font-medium bg-gray-400 hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              {['No.', 'Service Name', 'Cost', 'Unit', 'Category', 'Description', 'Action'].map(
                (head) => (
                  <th
                    key={head}
                    className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {services.map((s, i) => (
              <tr key={s._id} className="hover:bg-pink-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3 font-medium">{s.service_name}</td>
                <td className="px-5 py-3">৳ {s.cost}</td>
                <td className="px-5 py-3">{s.unit}</td>
                <td className="px-5 py-3">{s.service_category}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{s.description}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="px-4 py-1.5 rounded-lg text-white font-medium
                    bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-4 py-1.5 rounded-lg text-white font-medium
                    bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                    shadow-md hover:shadow-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
