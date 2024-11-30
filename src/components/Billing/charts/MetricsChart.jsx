import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format, subMonths } from 'date-fns';

const MetricsChart = ({ period = 'month' }) => {
  const [activeMetric, setActiveMetric] = useState('conversion');

  // Sample data for conversion funnel
  const funnelData = [
    { name: 'Enquiries', value: 100, color: '#60a5fa' },
    { name: 'Quotes Sent', value: 75, color: '#34d399' },
    { name: 'Accepted', value: 45, color: '#fbbf24' },
    { name: 'Completed', value: 40, color: '#4ade80' }
  ];

  // Sample data for costs breakdown
  const costsData = [
    { name: 'Cleaning', value: 28000, color: '#4ade80' },
    { name: 'Overhead', value: 8500, color: '#f87171' },
    { name: 'Marketing', value: 3500, color: '#60a5fa' },
    { name: 'Other', value: 2000, color: '#fbbf24' }
  ];

  // Sample data for cancellations
  const generateCancellationData = () => {
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      data.push({
        name: format(date, 'MMM'),
        count: Math.floor(Math.random() * 5),
        revenue: Math.floor(Math.random() * 2000)
      });
    }
    return data;
  };

  const cancellationData = generateCancellationData();

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'revenue' ? ' $' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeMetric) {
      case 'conversion':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={funnelData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Count">
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'costs':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
              >
                {costsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'cancellations':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={cancellationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#f87171" />
              <YAxis yAxisId="right" orientation="right" stroke="#60a5fa" />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Cancellations" fill="#f87171" />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue Lost" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Business Metrics</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              activeMetric === 'conversion'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveMetric('conversion')}
          >
            Conversion
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              activeMetric === 'costs'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveMetric('costs')}
          >
            Costs
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              activeMetric === 'cancellations'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveMetric('cancellations')}
          >
            Cancellations
          </button>
        </div>
      </div>
      {renderChart()}
    </div>
  );
};

export default MetricsChart;
