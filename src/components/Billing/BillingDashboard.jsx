import React, { useState } from 'react';
import { 
  Download,
  Filter,
  Search
} from 'lucide-react';

// Import all components
import QuickStats from './QuickStats';
import CustomerBillingTable from './CustomerBillingTable';
import CleanerPaymentsTable from './CleanerPaymentsTable';

const BillingDashboard = () => {
  const [activeView, setActiveView] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('this-month');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample filter options
  const filterOptions = {
    status: ['all', 'paid', 'pending', 'overdue'],
    amount: ['all', '0-100', '101-500', '501+'],
    paymentMethod: ['all', 'credit card', 'bank transfer', 'cash'],
  };

  const FilterPanel = () => (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-20">
      <h3 className="font-medium mb-3">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select className="w-full border rounded-lg p-2 text-sm">
            {filterOptions.status.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
          <select className="w-full border rounded-lg p-2 text-sm">
            {filterOptions.amount.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select className="w-full border rounded-lg p-2 text-sm">
            {filterOptions.paymentMethod.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button 
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            onClick={() => setFilterOpen(false)}
          >
            Clear All
          </button>
          <button 
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setFilterOpen(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Billing & Payments</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg ${
              activeView === 'customers' 
                ? 'bg-green-500 text-white' 
                : 'bg-white border hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('customers')}
          >
            Customer Billing
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${
              activeView === 'cleaners' 
                ? 'bg-green-500 text-white' 
                : 'bg-white border hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('cleaners')}
          >
            Cleaner Payments
          </button>
        </div>
      </div>

      {/* Quick Stats Section */}
      <QuickStats />

      {/* Controls Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border relative">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeView === 'customers' ? 'customers' : 'cleaners'}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            {filterOpen && <FilterPanel />}
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border">
        {activeView === 'customers' ? (
          <CustomerBillingTable />
        ) : (
          <CleanerPaymentsTable />
        )}
      </div>
    </div>
  );
};

export default BillingDashboard;
