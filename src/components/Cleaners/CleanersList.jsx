import React, { useState } from 'react';
import { 
  UserPlus, 
  Search,
  Filter,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import CleanerOnboarding from './CleanerOnboarding';
import CleanerDetails from './CleanerDetails';

const CleanersList = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample cleaners data
  const [cleaners] = useState([
    {
      id: 1,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "555-0123",
      status: "active",
      onboardingStatus: {
        personalInfo: "completed",
        documents: "pending",
        bankDetails: "completed",
        training: "not_started",
        appSetup: "completed"
      },
      documents: {
        id: "verified",
        policeCheck: "pending",
        workEligibility: "not_submitted"
      },
      performance: {
        rating: 4.8,
        completedJobs: 156,
        reliability: 98,
        lastActive: "2024-10-25"
      },
      joinDate: "2024-01-15"
    },
    // Add more sample cleaners here
  ]);

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getOnboardingProgress = (cleaner) => {
    const steps = Object.values(cleaner.onboardingStatus);
    const completed = steps.filter(step => step === "completed").length;
    return Math.round((completed / steps.length) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Cleaners</h1>
        <button
          onClick={() => setShowOnboarding(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Cleaner
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cleaners..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Cleaners List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Onboarding
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cleaners.map((cleaner) => (
                <tr 
                  key={cleaner.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedCleaner(cleaner);
                    setShowDetails(true);
                  }}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{cleaner.name}</div>
                      <div className="text-sm text-gray-500">{cleaner.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cleaner.status)}`}>
                      {cleaner.status.charAt(0).toUpperCase() + cleaner.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${getOnboardingProgress(cleaner)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getOnboardingProgress(cleaner)}% Complete
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{cleaner.performance.rating}</span>
                      <span className="text-gray-500 ml-2">
                        ({cleaner.performance.completedJobs} jobs)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {Object.entries(cleaner.documents).map(([doc, status]) => (
                        <span
                          key={doc}
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            status === 'verified' 
                              ? 'bg-green-100 text-green-800' 
                              : status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {doc.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-gray-400 inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showOnboarding && (
        <CleanerOnboarding 
          onClose={() => setShowOnboarding(false)} 
        />
      )}
      
      {showDetails && selectedCleaner && (
        <CleanerDetails
          cleaner={selectedCleaner}
          onClose={() => {
            setShowDetails(false);
            setSelectedCleaner(null);
          }}
        />
      )}
    </div>
  );
};

export default CleanersList;
