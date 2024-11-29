import React, { useState } from 'react';
import Head from 'next/head';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Bell, 
  Home,
  Clock,
  MessagesSquare
} from 'lucide-react';

// Only import Chat for now
import ChatDashboard from '../components/Chat/ChatDashboard';

const AdminDashboard = () => {
  const colors = {
    lime: '#c7d66b',
    forest: '#1b3630',
    lemon: '#f3f1c0',
    aqua: '#01c6a0',
    white: '#ffffff',
    black: '#000000'
  };

  const [activeTab, setActiveTab] = useState('overview');

  // Basic Overview Section
  const OverviewSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold" style={{ color: colors.forest }}>Dashboard Overview</h2>
      <p>Overview content will be added later.</p>
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
          <div className="flex-1 overflow-auto">
            {activeTab === 'overview' && <OverviewSection />}
            {activeTab === 'chat' && <ChatDashboard />}
            {/* Other tabs will show placeholder message */}
            {['customers', 'bookings', 'cleaners', 'billing'].includes(activeTab) && (
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Coming Soon</h2>
                <p className="text-gray-600 mt-2">This feature is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
