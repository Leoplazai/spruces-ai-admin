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
                  value={formData.personalInfo.firstName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, firstName: e.target.value }
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, lastName: e.target.value }
                  })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border p-2"
                value={formData.personalInfo.email}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, email: e.target.value }
                })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border p-2"
                value={formData.personalInfo.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, phone: e.target.value }
                })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                className="mt-1 block w-full rounded-md border p-2"
                rows="3"
                value={formData.personalInfo.address}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, address: e.target.value }
                })}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {[
              { title: 'ID Verification', key: 'idUpload', description: 'Upload government-issued ID' },
              { title: 'Police Check', key: 'policeCheck', description: 'Upload police check certificate' },
              { title: 'Work Eligibility', key: 'workEligibility', description: 'Upload work visa or citizenship' }
            ].map((doc) => (
              <div key={doc.key} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{doc.title}</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {formData.documents[doc.key] ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-600">Document uploaded</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">{doc.description}</p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFormData({
                          ...formData,
                          documents: { ...formData.documents, [doc.key]: e.target.files[0] }
                        })}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
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
                value={formData.bankDetails.accountName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, accountName: e.target.value }
                })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">BSB</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  value={formData.bankDetails.bsb}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, bsb: e.target.value }
                  })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-2"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }
                  })}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {[
              { id: 'safetyModule', title: 'Safety Training', description: 'Learn about workplace safety' },
              { id: 'cleaningBasics', title: 'Cleaning Basics', description: 'Essential cleaning techniques' },
              { id: 'customerService', title: 'Customer Service', description: 'Customer interaction guidelines' }
            ].map((module) => (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.description}</p>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg ${
                      formData.training[module.id]
                        ? 'bg-green-100 text-green-800'
                        : 'bg-green-500 text-white'
                    }`}
                    onClick={() => setFormData({
                      ...formData,
                      training: { ...formData.training, [module.id]: true }
                    })}
                  >
                    {formData.training[module.id] ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Download Mobile App</h3>
              <div className="flex justify-center space-x-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                  App Store
                </button>
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                  Google Play
                </button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-medium mb-2">Next Steps</h4>
              <p className="text-gray-600">
                1. Download and install the app<br />
                2. Sign in with your email<br />
                3. Complete app setup<br />
                4. Start accepting jobs
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Cleaner Onboarding</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${currentStep === step.id ? 'bg-green-500 text-white' : 
                    currentStep > step.id ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  {step.id}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t sticky bottom-0 bg-white">
          <div className="flex justify-between">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep < steps.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  onClose();
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerOnboarding;
