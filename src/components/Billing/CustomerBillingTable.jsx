import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  Eye, 
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign
} from 'lucide-react';

const CustomerBillingTable = () => {
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  // Sample data
  const invoices = [
    {
      id: 'INV-2024001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com'
      },
      amount: 150.00,
      status: 'paid',
      date: '2024-10-25',
      dueDate: '2024-11-08',
      service: 'Deep Clean',
      paymentMethod: 'Credit Card',
      paidDate: '2024-10-26'
    },
    {
      id: 'INV-2024002',
      customer: {
        name: 'Mike Smith',
        email: 'mike@example.com'
      },
      amount: 85.00,
      status: 'pending',
      date: '2024-10-26',
      dueDate: '2024-11-09',
      service: 'Regular Clean',
      paymentMethod: 'Pending'
    },
    {
      id: 'INV-2024003',
      customer: {
        name: 'Emma Davis',
        email: 'emma@example.com'
      },
      amount: 200.00,
      status: 'overdue',
      date: '2024-10-15',
      dueDate: '2024-10-29',
      service: 'Move Out Clean',
      paymentMethod: 'Pending'
    }
  ];

  const getStatusStyles = (status) => {
    const styles = {
      paid: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: Clock
      },
      overdue: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle
      },
      cancelled: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: XCircle
      }
    };
    return styles[status] || styles.pending;
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (invoiceId) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  const InvoiceActions = ({ invoice }) => {
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
                Download PDF
              </button>
              {invoice.status === 'pending' && (
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-green-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Record Payment
                </button>
              )}
              {invoice.status === 'overdue' && (
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Send Reminder
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedInvoices.length} selected
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Download
            </button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Send Reminder
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
                checked={selectedInvoices.length === invoices.length}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => {
            const StatusIcon = getStatusStyles(invoice.status).icon;
            return (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectInvoice(invoice.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-500">Due {invoice.dueDate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{invoice.customer.name}</div>
                  <div className="text-sm text-gray-500">{invoice.customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">{invoice.paymentMethod}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusStyles(invoice.status).bg
                  } ${getStatusStyles(invoice.status).text}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{invoice.date}</div>
                  {invoice.paidDate && (
                    <div className="text-sm text-gray-500">
                      Paid {invoice.paidDate}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {invoice.service}
                </td>
                <td className="px-6 py-4 text-right">
                  <InvoiceActions invoice={invoice} />
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
              <span className="font-medium">97</span> results
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

export default CustomerBillingTable;
