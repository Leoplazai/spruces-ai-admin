import React, { useState } from 'react';
import { 
  X, 
  Star,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';

const CleanerDetails = ({ cleaner, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderDocumentStatus = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" /> Verified
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-yellow-600">
            <Clock className="w-4 h-4 mr-1" /> Pending
          </span>
        );
      default:
        return (
          <span className="flex items-center text-red-600">
            <XCircle className="w-4 h-4 mr-1" /> Not Submitted
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-600">
                {cleaner.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{cleaner.name}</h2>
              <div className="flex items-center text-gray-600">
                <div className="flex items-center mr-4">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {cleaner.performance.rating}
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  cleaner.status === 'active' ? 'bg-green-100 text-green-800' :
                  cleaner.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {cleaner.status.charAt(0).toUpperCase() + cleaner.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b px-6">
          <div className="flex space-x-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'documents', label: 'Documents' },
              { id: 'performance', label: 'Performance' },
              { id: 'payments', label: 'Payments' },
              { id: 'history', label: 'History' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-3 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                    <span>{cleaner.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <span>{cleaner.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-500 mb-1">Completed Jobs</div>
                  <div className="text-2xl font-semibold">{cleaner.performance.completedJobs}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-500 mb-1">Reliability Score</div>
                  <div className="text-2xl font-semibold">{cleaner.performance.reliability}%</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-500 mb-1">Member Since</div>
                  <div className="text-2xl font-semibold">{new Date(cleaner.joinDate).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Onboarding Progress */}
              <div>
                <h3 className="font-medium mb-4">Onboarding Status</h3>
                <div className="space-y-4">
                  {Object.entries(cleaner.onboardingStatus).map(([step, status]) => (
                    <div key={step} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="capitalize">{step.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        status === 'completed' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {Object.entries(cleaner.documents).map(([doc, status]) => (
                <div key={doc} className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium capitalize">
                        {doc.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div>{renderDocumentStatus(status)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg border">
                  <div className="text-lg font-medium mb-4">Rating Overview</div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold">{cleaner.performance.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on {cleaner.performance.completedJobs} completed jobs
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border">
                  <div className="text-lg font-medium mb-4">Reliability Score</div>
                  <div className="text-3xl font-bold">
                    {cleaner.performance.reliability}%
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on attendance and punctuality
                  </p>
                </div>
              </div>

              {/* More performance metrics could be added here */}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-medium">Payment History</h3>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Sample payment history - replace with real data */}
                    <tr>
                      <td className="px-6 py-4">2024-10-25</td>
                      <td className="px-6 py-4">Weekly payout</td>
                      <td className="px-6 py-4">$450.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-medium">Recent Jobs</h3>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Sample job history - replace with real data */}
                    <tr>
                      <td className="px-6 py-4">2024-10-25</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">Regular Clean</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          5.0
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CleanerDetails;
