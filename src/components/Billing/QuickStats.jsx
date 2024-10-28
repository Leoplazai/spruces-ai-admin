import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  UserPlus,
  AlertCircle,
  CreditCard,
  Calendar,
  XCircle,
  FileText,
  MessageCircle,
  PieChart
} from 'lucide-react';

const QuickStats = ({ period = 'month' }) => {
  // Sample data structure with your specific metrics
  const stats = {
    enquiries: {
      total: 45,
      conversion: 35, // percentage
      trend: { direction: 'up', value: 15 }
    },
    quotes: {
      sent: 38,
      accepted: 28,
      pending: 10,
      conversion: 73.68 // percentage
    },
    newRevenue: {
      oneOff: 12500.00,
      monthly: 4500.00,
      trend: { direction: 'up', value: 22 }
    },
    cancellations: {
      count: 3,
      monthlyRevenueLost: 1200.00,
      reason: {
        price: 1,
        quality: 1,
        moved: 1
      }
    },
    payments: {
      overdueAR: 3200.00,
      averagePaymentTime: 2.5, // days
      onTimePayments: 95 // percentage
    },
    revenue: {
      recurring: 45000.00,
      oneOff: 15000.00,
      total: 60000.00,
      trend: { direction: 'up', value: 12.5 }
    },
    costs: {
      cleaning: 28000.00,
      overhead: 8500.00,
      margin: 39.17 // percentage
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Recurring</span>
              <span className="font-semibold">${stats.revenue.recurring.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">One-Off</span>
              <span className="font-semibold">${stats.revenue.oneOff.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${stats.revenue.total.toLocaleString()}</span>
              </div>
              <div className="mt-2 text-sm">
                <TrendingUp className="w-4 h-4 inline mr-1 text-green-500" />
                <span className="text-green-500">{stats.revenue.trend.value}%</span>
                <span className="text-gray-500"> vs last {period}</span>
              </div>
            </div>
          </div>
        </div>

        {/* New Business */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-4">New Business</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Enquiries</span>
              <span className="font-semibold">{stats.enquiries.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quotes Sent</span>
              <span className="font-semibold">{stats.quotes.sent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion</span>
              <span className="font-semibold text-green-600">{stats.quotes.conversion}%</span>
            </div>
          </div>
        </div>

        {/* New Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-4">New Revenue Added</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly</span>
              <span className="font-semibold">${stats.newRevenue.monthly.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">One-Off</span>
              <span className="font-semibold">${stats.newRevenue.oneOff.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-end">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-green-500">{stats.newRevenue.trend.value}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Costs & Margins */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Costs Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Cleaning Costs</span>
              <span className="font-semibold">${stats.costs.cleaning.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overhead</span>
              <span className="font-semibold">${stats.costs.overhead.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Margin</span>
                <span className="font-bold text-green-600">{stats.costs.margin}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Payment Health */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium mb-3">Payment Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Overdue AR</span>
              <span className="font-medium text-red-600">
                ${stats.payments.overdueAR.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Avg. Payment Time</span>
              <span className="font-medium">
                {stats.payments.averagePaymentTime} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">On-time Payments</span>
              <span className="font-medium text-green-600">
                {stats.payments.onTimePayments}%
              </span>
            </div>
          </div>
        </div>

        {/* Cancellations */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium mb-3">Cancellations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Cancellations</span>
              <span className="font-medium text-red-600">{stats.cancellations.count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Monthly Revenue Lost</span>
              <span className="font-medium text-red-600">
                ${stats.cancellations.monthlyRevenueLost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Churn Rate</span>
              <span className="font-medium">
                {((stats.cancellations.count / stats.revenue.recurring) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium mb-3">Conversion Funnel</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Enquiry → Quote</span>
              <span className="font-medium">
                {((stats.quotes.sent / stats.enquiries.total) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Quote → Sale</span>
              <span className="font-medium">
                {((stats.quotes.accepted / stats.quotes.sent) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Overall Conversion</span>
              <span className="font-medium text-green-600">
                {((stats.quotes.accepted / stats.enquiries.total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
