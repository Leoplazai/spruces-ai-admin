import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  Eye, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  BankNote,
  Calendar,
  Star
} from 'lucide-react';

const CleanerPaymentsTable = () => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  
  // Sample data
  const payments = [
    {
      id: 'PAY-2024001',
      cleaner: {
        name: 'Maria Garcia',
        email: 'maria@example.com',
        rating: 4.8
      },
      amount: 850.00,
      status: 'paid',
      period: '2024-10-01 to 2024-10-15',
      paidDate: '2024-10-16',
      jobs: 12,
      hoursWorked: 36,
      bankInfo: '**** 4532',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-2024002',
      cleaner: {
        name: 'John Smith',
        email: 'john@example.com',
        rating: 4.6
      },
      amount: 720.00,
      status: 'processing',
      period: '2024-10-01 to 2024-10-15',
      jobs: 10,
      hoursWorked: 30,
      bankInfo: '**** 7890',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'PAY-2024003',
      cleaner: {
        name: 'Lisa Chen',
        email: 'lisa@example.com',
        rating: 4.9
      },
      amount: 450.00,
      status: 'pending',
      period: '2024-10-01 to 2024-10-15',
      jobs: 6,
      hoursWorked: 18,
      bankInfo: '**** 1234',
      paymentMethod: 'Direct Deposit'
    }
  ];

  const getStatusStyles = (status) => {
    const styles = {
      paid: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle
      },
      processing: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: Clock
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: AlertCircle
      },
      failed: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle
      }
    };
    return styles[status] || styles.pending;
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPayments(payments.map(payment => payment.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments(prev => {
      if (prev.includes(paymentId)) {
        return prev.filter(id => id !== paymentId);
      } else {
        return [...prev, paymentId];
      }
    });
  };

  const PaymentActions = ({ payment }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className="relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </button>
              {payment.status === 'pending' && (
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-green-600">
                  <BankNote className="w-4 h-4 mr-2" />
                  Process Payment
                </button>
              )}
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Bulk Actions */}
      {selectedPayments.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedPayments.length} selected
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Process Selected
            </button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Download Statements
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-12 px-6 py-3 text-left">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={handleSelectAll}
                checked={selectedPayments.length === payments.length}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cleaner
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jobs/Hours
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Info
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => {
            const StatusIcon = getStatusStyles(payment.status).icon;
            return (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedPayments.includes(payment.id)}
                    onChange={() => handleSelectPayment(payment.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.cleaner.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.cleaner.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {payment.cleaner.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{payment.period}</div>
                  {payment.paidDate && (
                    <div className="text-sm text-gray-500">
                      Paid {payment.paidDate}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${(payment.amount / payment.hoursWorked).toFixed(2)}/hr
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {payment.jobs} jobs
                  </div>
                  <div className="text-sm text-gray-500">
                    {payment.hoursWorked} hours
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusStyles(payment.status).bg
                  } ${getStatusStyles(payment.status).text}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {payment.paymentMethod}
                  </div>
                  <div className="text-sm text-gray-500">
                    {payment.bankInfo}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <PaymentActions payment={payment} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">45</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerPaymentsTable;
