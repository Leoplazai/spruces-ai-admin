import React, { useState } from 'react';
import { 
  UserPlus, 
  Search,
  Filter,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import AddCustomerForm from './AddCustomerForm';
import CustomerActions from './CustomerActions';

const statusConfigs = {
  cold: {
    label: 'Cold',
    color: 'bg-blue-100 text-blue-800',
    description: 'New website inquiry'
  },
  warm: {
    label: 'Warm',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Initial contact made'
  },
  hot: {
    label: 'Hot',
    color: 'bg-orange-100 text-orange-800',
    description: 'Quote sent/In discussion'
  },
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-800',
    description: 'Current customer'
  },
  past: {
    label: 'Past',
    color: 'bg-gray-100 text-gray-800',
    description: 'Previous customer'
  }
};

const CustomerList = () => {
  // All state declarations
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "555-0123",
      status: "cold",
      lastContact: "2024-10-25",
      notes: "Inquired about weekly cleaning",
      source: "Website Form"
    },
    {
      id: 2,
      name: "Mike Smith",
      email: "mike@example.com",
      phone: "555-0124",
      status: "warm",
      lastContact: "2024-10-24",
      notes: "Following up on quote request",
      source: "Google Ads"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  // Handler functions
  const handleAddCustomer = (newCustomer) => {
    const newId = customers.length + 1;
    setCustomers([...customers, { ...newCustomer, id: newId }]);
  };

  const handleEditCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setCustomerToEdit(null);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  // Filter counts
  const getCounts = () => {
    const counts = { all: customers.length };
    Object.keys(statusConfigs).forEach(status => {
      counts[status] = customers.filter(c => c.status === status).length;
    });
    return counts;
  };

  const counts = getCounts();

  // Timeline component
  const Timeline = ({ status }) => {
    const stages = ['cold', 'warm', 'hot', 'active'];
    const currentIndex = stages.indexOf(status);

    return (
      <div className="flex items-center space-x-1">
        {stages.map((stage, index) => (
          <React.Fragment key={stage}>
            <div 
              className={`w-2 h-2 rounded-full ${
                index <= currentIndex 
                  ? 'bg-green-500' 
                  : 'bg-gray-200'
              }`} 
            />
            {index < stages.length - 1 && (
              <div className={`w-4 h-0.5 ${
                index < currentIndex 
                  ? 'bg-green-500' 
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Filtered customers
  const filteredCustomers = customers.filter(customer => {
    const matchesFilter = activeFilter === 'all' || customer.status === activeFilter;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Leads & Customers</h2>
        <button 
          onClick={() => {
            setCustomerToEdit(null);
            setShowAddForm(true);
          }} 
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'all' 
              ? 'bg-gray-200 text-gray-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All ({counts.all})
        </button>
        {Object.entries(statusConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${activeFilter === key 
                ? config.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {config.label} ({counts[key]})
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfigs[customer.status].color}`}>
                    {statusConfigs[customer.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Timeline status={customer.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {customer.lastContact}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.source}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.notes}
                </td>
                <td className="px-6 py-4 text-right">
                  <CustomerActions
                    customer={customer}
                    onEdit={() => {
                      setCustomerToEdit(customer);
                      setShowAddForm(true);
                    }}
                    onDelete={handleDeleteCustomer}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <AddCustomerForm
          customerToEdit={customerToEdit}
          onClose={() => {
            setShowAddForm(false);
            setCustomerToEdit(null);
          }}
          onSubmit={(formData) => {
            if (customerToEdit) {
              handleEditCustomer(formData);
            } else {
              handleAddCustomer(formData);
            }
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default CustomerList;
