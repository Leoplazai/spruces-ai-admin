import React, { useState } from 'react';
import { 
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Clock,
  CalendarCheck,
  X
} from 'lucide-react';

const BookingsView = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentView, setCurrentView] = useState('month'); // month, week, day
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data - will be replaced with real data later
  const sampleBookings = [
    {
      id: 1,
      customerId: 1,
      customerName: "Sarah Johnson",
      siteId: 1,
      siteName: "Main House",
      address: "123 Main St",
      cleanerId: 1,
      cleanerName: "Maria G.",
      date: "2024-10-28",
      time: "09:00",
      duration: 3,
      status: "confirmed",
      type: "recurring",
      frequency: "weekly"
    },
    // Add more sample bookings
  ];

  // Booking Creation Steps Component
  const BookingSteps = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">New Booking</h2>
            <button 
              onClick={() => setShowBookingModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              {['Customer', 'Site', 'Service', 'Schedule', 'Cleaner'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${index + 1 === bookingStep ? 'bg-green-500 text-white' : 
                      index + 1 < bookingStep ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-400'}
                  `}>
                    {index + 1}
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-600">
                    {step}
                  </div>
                  {index < 4 && (
                    <div className="w-12 h-0.5 mx-2 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input 
                    type="text"
                    placeholder="Search customers..."
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                    Search
                  </button>
                </div>
                {/* Customer list would go here */}
              </div>
            )}
            {/* Other steps content */}
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex justify-between">
            <button
              onClick={() => bookingStep > 1 && setBookingStep(bookingStep - 1)}
              className={`px-4 py-2 border rounded-lg ${
                bookingStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
              disabled={bookingStep === 1}
            >
              Previous
            </button>
            <button
              onClick={() => bookingStep < 5 ? setBookingStep(bookingStep + 1) : setShowBookingModal(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {bookingStep === 5 ? 'Create Booking' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">October 2024</h2>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentView('month')}
            className={`px-4 py-2 rounded ${
              currentView === 'month' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setCurrentView('week')}
            className={`px-4 py-2 rounded ${
              currentView === 'week' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setCurrentView('day')}
            className={`px-4 py-2 rounded ${
              currentView === 'day' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow">
        {/* Calendar header */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar body */}
        <div className="grid grid-cols-7 grid-rows-5 gap-px bg-gray-200">
          {/* Sample calendar days */}
          {Array.from({ length: 35 }).map((_, index) => (
            <div key={index} className="bg-white min-h-32 p-2">
              <div className="text-sm text-gray-400">{index + 1}</div>
              {/* Sample booking */}
              {index === 15 && (
                <div className="mt-1 p-1 bg-green-100 rounded text-xs">
                  <div className="font-medium text-green-800">Sarah J.</div>
                  <div className="text-green-600">9:00 AM - Main House</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Creation Modal */}
      {showBookingModal && <BookingSteps />}
    </div>
  );
};

export default BookingsView;
