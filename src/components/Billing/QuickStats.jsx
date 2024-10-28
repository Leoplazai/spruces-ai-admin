import React, { useState } from 'react';
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
  PieChart,
  ChevronDown
} from 'lucide-react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import RevenueChart from './charts/RevenueChart';
import MetricsChart from './charts/MetricsChart';

const QuickStats = () => {
  // Add period selection state
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Period options
  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'last-month', label: 'Last Month' },
    { id: 'last-3-months', label: 'Last 3 Months' },
    { id: 'last-6-months', label: 'Last 6 Months' },
    { id: 'this-year', label: 'This Year' },
  ];

  // Sample comparison data structure
  const getPeriodComparison = (period) => {
    // This would come from your API in real implementation
    const comparisons = {
      'this-month': {
        current: {
          revenue: 60000,
          newCustomers: 45,
          cancellations: 3
        },
        previous: {
          revenue: 55000,
          newCustomers: 40,
          cancellations: 4
        }
      }
      // Add other period comparisons here
    };

    return comparisons[period] || comparisons['this-month'];
  };

  const currentPeriodData = getPeriodComparison(selectedPeriod);

  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down'
    };
  };

  const changes = {
    revenue: calculateChange(
      currentPeriodData.current.revenue,
      currentPeriodData.previous.revenue
    ),
    customers: calculateChange(
      currentPeriodData.current.newCustomers,
      currentPeriodData.previous.newCustomers
    ),
    cancellations: calculateChange(
      currentPeriodData.current.cancellations,
      currentPeriodData.previous.cancellations
    )
  };

  // Period selector component
  const PeriodSelector = () => (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg"
        onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
      >
        <span>{periods.find(p => p.id === selectedPeriod)?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {showPeriodDropdown && (
        <div className="absolute top-full mt-1 w-48 bg-white border rounded-lg shadow-lg z-10">
          {periods.map(period => (
            <button
              key={period.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                setSelectedPeriod(period.id);
                setShowPeriodDropdown(false);
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Your existing stats data here...
  const stats = {
    // ... (keep your existing stats object)
  };

  return (
    <div className="space-y-6">
      {/* Period Selector and Comparison Header */}
      <div className="flex justify-between items-center">
        <PeriodSelector />
        <div className="text-sm text-gray-500">
          Comparing to {format(subMonths(new Date(), 1), 'MMMM yyyy')}
        </div>
      </div>

      {/* Your existing stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... keep your existing stat cards ... */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart period={selectedPeriod} />
        <MetricsChart period={selectedPeriod} />
      </div>

      {/* Period Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Revenue Change</h3>
          <div className="flex items-center space-x-2">
            {changes.revenue.direction === 'up' ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-xl font-bold ${
              changes.revenue.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {changes.revenue.value}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            vs previous period
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-3">New Customers</h3>
          <div className="flex items-center space-x-2">
            {changes.customers.direction === 'up' ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-xl font-bold ${
              changes.customers.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {changes.customers.value}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            vs previous period
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Cancellation Rate</h3>
          <div className="flex items-center space-x-2">
            {changes.cancellations.direction === 'down' ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-xl font-bold ${
              changes.cancellations.direction === 'down' ? 'text-green-500' : 'text-red-500'
            }`}>
              {changes.cancellations.value}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            vs previous period
          </p>
        </div>
      </div>

      {/* Keep your existing secondary metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ... your existing detailed stats cards ... */}
      </div>
    </div>
  );
};

export default QuickStats;
