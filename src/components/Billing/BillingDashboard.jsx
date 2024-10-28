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

const BillingDashboard = () => {
  const [activeView, setActiveView] = useState('customers');
  const [dateRange, setDateRange] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample stats data
  const stats = {
    totalRevenue: 45850.00,
    pendingPayments: 3200.00,
    avgPaymentTime: 2.5, // days
    outstandingInvoices: 12,
    totalTransactions: 156,
    successRate: 98.5
  };

  // Sample date ranges
  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'last-month', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' }
  ];

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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 inline mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+12.5%</span> vs last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-semibold">${stats.pendingPayments.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {stats.outstandingInvoices} invoices pending
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Payment Time</p>
              <p className="text-2xl font-semibold">{stats.avgPaymentTime} days</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {stats.successRate}% success rate
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-semibold">{stats.totalTransactions}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            All time transactions
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border">
        {/* Date Range Selector */}
        <div className="flex items-center space-x-2">
          <select 
            className="pl-3 pr-10 py-2 border rounded-lg"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            {dateRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-500" />
          </button>
        </div>

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
            {/* CustomerBilling component will go here */}
            <p className="text-gray-500">Customer Billing Content</p>
          </div>
        ) : (
          <div className="p-4">
            {/* CleanerPayments component will go here */}
            <p className="text-gray-500">Cleaner Payments Content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDashboard;
