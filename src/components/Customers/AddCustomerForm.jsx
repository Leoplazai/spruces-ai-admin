import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddCustomerForm = ({ onClose, onSubmit, customerToEdit = null }) => {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    status: 'cold',
    source: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  // If we're editing, populate form with customer data
  useEffect(() => {
    if (customerToEdit) {
      setFormData(customerToEdit);
    }
  }, [customerToEdit]);

  const sourceOptions = [
    'Website Form',
    'Google Ads',
    'Facebook Ad',
    'Referral',
    'Other'
  ];

  const statusOptions = [
    { value: 'cold', label: 'Cold Lead' },
    { value: 'warm', label: 'Warm Lead' },
    { value: 'hot', label: 'Hot Lead' },
    { value: 'active', label: 'Active Customer' },
    { value: 'past', label: 'Past Customer' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {customerToEdit ? 'Edit Customer' : 'Add New Lead'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full p-2 border rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Source
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.source}
              onChange={(e) => setFormData({...formData, source: e.target.value})}
            >
              <option value="">Select source...</option>
              {sourceOptions.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {customerToEdit ? 'Save Changes' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerForm;
