import React, { useState } from 'react';
import Head from 'next/head';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Bell, 
  Home,
  Clock,
  Plus,
  Edit,
  MessageSquare,
  UserPlus,
  MessagesSquare,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  // Brand colors
  const colors = {
    lime: '#c7d66b',
    forest: '#1b3630',
    lemon: '#f3f1c0',
    aqua: '#01c6a0',
    white: '#ffffff',
    black: '#000000'
  };

  // States
  const [activeTab, setActiveTab] = useState('overview');

  // Sample Data
  const stats = {
    totalBookings: 156,
    activeCleaners: 24,
    pendingRequests: 8,
    revenue: 12580
  };

  // Component: Overview Section
  const OverviewSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold" style={{ color: colors.forest }}>Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} color={colors.aqua} title="Total Bookings" value={stats.totalBookings} />
        <StatCard icon={Users} color={colors.lime} title="Active Cleaners" value={stats.activeCleaners} />
        <StatCard icon={Clock} color={colors.forest} title="Pending Requests" value={stats.pendingRequests} />
        <StatCard icon={DollarSign} color={colors.aqua} title="Revenue" value={`$${stats.revenue}`} />
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, color, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-5 h-5" style={{ color }} />}
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
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
        <nav style={{ backgroundColor: colors.forest }} className="p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Spruces AI Admin</h1>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-white cursor-pointer hover:opacity-80" />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.lime }}></div>
            </div>
          </div>
        </nav>

        <div className="flex h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm p-4">
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
                  className="w-full flex items-center space-x-2 p-3 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: activeTab === item.id ? colors.lemon : 'white',
                    color: activeTab === item.id ? colors.forest : 'gray'
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            <OverviewSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
