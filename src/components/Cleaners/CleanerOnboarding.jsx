import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

const CleanerOnboarding = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    documents: {
      idUpload: null,
      policeCheck: null,
      workEligibility: null
    },
    bankDetails: {
      accountName: '',
      bsb: '',
      accountNumber: ''
    },
    training: {
      safetyModule: false,
      cleaningBasics: false,
      customerService: false
    }
  });

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic details and contact information'
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'Upload required documents'
    },
    {
      id: 3,
      title: 'Bank Details',
      description: 'Payment information'
    },
    {
      id: 4,
      title: 'Training',
      description: 'Complete required training modules'
    },
    {
      id: 5,
      title: 'App Setup',
      description: 'Download and setup mobile app'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit final data
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                className="mt-1 block w-full rounded-md border p-2"
                rows="3"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">ID Verification</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload government-issued ID</p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Police Check</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload police check certificate</p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Work Eligibility</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload work visa or citizenship</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">BSB</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Safety Training</h3>
                  <p className="text-sm text-gray-500">Learn about workplace safety</p>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  Start
                </button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className
