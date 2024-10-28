import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertCircle,
  CreditCard,
  Calendar,
  CheckCircle
} from 'lucide-react';

const QuickStats = ({ period = 'month' }) => {
  // Sample stats data - will be replaced with real data later
  const stats = {
    revenue: {
      total: 45850.00,
      trend: 12.5,
      comparison: 'up',
      breakdown: {
        completed: 42650.00,
        pending: 3200.00
      }
    },
    payments: {
      averageTime: 2.5, // days
      onTime: 95, // percentage
      pending: 12, // count
      overdue: 3 // count
    },
    transactions: {
      total: 156,
      successful: 152,
      failed: 4,
      refunded: 1
    },
    reconciliation: {
      matched: 98, // percentage
      unmatched: 5, // count
      flagged: 2 // count
    }
  };

  const StatCard = ({ title, value, trend, icon: Icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      {(trend || subtitle) && (
        <div className="mt-4 text-sm text-gray-500">
          {trend && (
            <>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 inline mr-1 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 inline mr-1 text-red-500" />
              )}
              <span className={`${
                trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
              } font-medium`}>
                {trend.value}%
              </span>
              {' vs last ' + period}
            </>
          )}
          {subtitle && !trend && subtitle}
        </div>
      )}
    </div>
  );

  // Secondary stats cards for detailed metrics
  const DetailCard = ({ title, items }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">{item.label}</span>
            <span className={`font-medium ${item.colorClass || ''}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.total.toLocaleString()}`}
          trend={{ direction: 'up', value: stats.revenue.trend }}
          icon={DollarSign}
          color="green"
        />
        
        <StatCard
          title="Payment Time"
          value={`${stats.payments.averageTime} days`}
          subtitle={`${stats.payments.onTime}% on time payments`}
          icon={Clock}
          color="blue"
        />
        
        <StatCard
          title="Pending Payments"
          value={stats.payments.pending}
          subtitle={`${stats.payments.overdue} overdue`}
          icon={CreditCard}
          color="yellow"
        />
        
        <StatCard
          title="Reconciliation"
          value={`${stats.reconciliation.matched}%`}
          subtitle={`${stats.reconciliation.unmatched} unmatched`}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailCard
          title="Revenue Breakdown"
          items={[
            { label: 'Completed Payments', value: `$${stats.revenue.breakdown.completed.toLocaleString()}` },
            { label: 'Pending Payments', value: `$${stats.revenue.breakdown.pending.toLocaleString()}` }
          ]}
        />

        <DetailCard
          title="Transaction Status"
          items={[
            { 
              label: 'Successful', 
              value: `${stats.transactions.successful}/${stats.transactions.total}`,
              colorClass: 'text-green-600'
            },
            { 
              label: 'Failed', 
              value: stats.transactions.failed,
              colorClass: 'text-red-600'
            },
            { 
              label: 'Refunded', 
              value: stats.transactions.refunded,
              colorClass: 'text-yellow-600'
            }
          ]}
        />

        <DetailCard
          title="Payment Health"
          items={[
            { 
              label: 'On-time Rate', 
              value: `${stats.payments.onTime}%`,
              colorClass: 'text-green-600'
            },
            { 
              label: 'Average Delay', 
              value: `${stats.payments.averageTime} days` 
            },
            { 
              label: 'Flagged Transactions', 
              value: stats.reconciliation.flagged,
              colorClass: 'text-red-600'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default QuickStats;
