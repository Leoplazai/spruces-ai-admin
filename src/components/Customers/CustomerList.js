// Add to your imports
import AddCustomerForm from './AddCustomerForm';

const CustomerList = () => {
  // Add this state near your other state declarations
  const [showAddForm, setShowAddForm] = useState(false);

  // Add this function to handle new customer submission
  const handleAddCustomer = (newCustomer) => {
    // This is where you'll integrate with your database later
    console.log('New customer:', newCustomer);
    // For now, just close the form
    setShowAddForm(false);
  };

  // Update your "Add New" button in the header to:
  <button 
    onClick={() => setShowAddForm(true)} 
    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
  >
    <UserPlus className="w-4 h-4 mr-2" />
    Add New
  </button>

  // Add this before the closing return statement
  {showAddForm && (
    <AddCustomerForm
      onClose={() => setShowAddForm(false)}
      onSubmit={handleAddCustomer}
    />
  )}

import React, { useState } from 'react';
import { 
  UserPlus, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

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
  // Sample data with all status types
  const [customers] = useState([
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
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "555-0125",
      status: "hot",
      lastContact: "2024-10-23",
      notes: "Quote sent, awaiting response",
      source: "Referral"
    },
    {
      id: 4,
      name: "John Wilson",
      email: "john@example.com",
      phone: "555-0126",
      status: "active",
      lastContact: "2024-10-22",
      notes: "Weekly cleaning - Mondays",
      source: "Website Form"
    },
    {
      id: 5,
      name: "Lisa Brown",
      email: "lisa@example.com",
      phone: "555-0127",
      status: "past",
      lastContact: "2024-09-15",
      notes: "Moved to different city",
      source: "Facebook Ad"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
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
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
