import React, { useState } from 'react';
import Head from 'next/head';

// Importing only icons we need initially
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Bell, 
  Home,
  MessagesSquare
} from 'lucide-react';

const AdminDashboard = () => {
  // Brand colors based on your palette
  const colors = {
    lime: '#c7d66b',
    forest: '#1b3630',
    lemon: '#f3f1c0',
    aqua: '#01c6a0',
    white: '#ffffff',
    black: '#000000'
  };

  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - will be replaced with Supabase data later
  const stats = {
    totalBookings: 156,
    activeCleaners: 24,
    pendingRequests: 8,
    revenue: 12580
  };

  // Basic Overview Component
  const OverviewSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold" style={{ color: colors.forest }}>Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Active Cleaners" value={stats.activeCleaners} />
        <StatCard title="Pending Requests" value={stats.pendingRequests} />
        <StatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>
    </div>
  );

  const StatCard = ({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="text-gray-600">{title}</div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Spruces AI Admin</title>
        <meta name="description" content="Spruces AI Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav style={{ backgroundColor: colors.forest }} className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Spruces AI Admin</h1>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-white" />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.lime }}></div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white h-screen shadow-sm p-4">
            <div className="space-y-2">
              {[
                { id: 'overview', icon: Home, label: 'Overview' },
                { id: 'customers', icon: Users, label: 'Customers' },
                { id: 'bookings', icon: Calendar, label: 'Bookings' },
                { id: 'cleaners', icon: Users, label: 'Cleaners' },
                { id: 'billing', icon: DollarSign, label: 'Billing' },
                { id: 'chat', icon: MessagesSquare, label: 'Chat' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="w-full flex items-center space-x-2 p-2 rounded"
                  style={{ 
                    backgroundColor: activeTab === item.id ? colors.lemon : 'white',
                    color: activeTab === item.id ? colors.forest : 'gray'
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <OverviewSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
