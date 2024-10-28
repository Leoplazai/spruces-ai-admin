import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar,
  Download,
  FileText,
  Users,
  CreditCard,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';
import QuickStats from './QuickStats';

const BillingDashboard = () => {
  const [activeView, setActiveView] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');

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

      {/* Search and Actions Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, cleaner, or invoice number..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border">
        {activeView === 'customers' ? (
          <div className="p-4">
            {/* Customer Billing Table will go here */}
            <p className="text-gray-500">Customer Billing Content</p>
          </div>
        ) : (
          <div className="p-4">
            {/* Cleaner Payments Table will go here */}
            <p className="text-gray-500">Cleaner Payments Content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDashboard;
