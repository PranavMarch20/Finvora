import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  initialValues = {}, 
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessType: '',
    serviceRequired: '',
    requirementDetails: '',
    selectedPackage: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        businessType: initialValues.businessType || prev.businessType,
        serviceRequired: initialValues.serviceRequired || prev.serviceRequired,
        selectedPackage: initialValues.selectedPackage || prev.selectedPackage
      }));
    }
  }, [initialValues]);

  if (!isOpen) return null;

  const businessTypes = [
    'Individuals & Freelancers',
    'Proprietors & Partnerships',
    'Startups, LLPs & Companies',
    'SMEs & Manufacturers',
    'Other Business Entity'
  ];

  const servicesList = [
    'Accounting & Bookkeeping',
    'Bank, Ledger & Gateway Reconciliation',
    'Monthly Closing & Financial Statements',
    'Individual, Freelancer & Proprietor Accounts',
    'GST Registration & Return Support',
    'Input Tax Credit (ITC) Reconciliation',
    'TDS Support & Tax Compliance Tracking',
    'Income-tax Return Preparation (ITR)',
    'Company, LLP & MCA/ROC Compliance',
    'Payroll, Payslips & PF/ESI Support',
    'Udyam, IEC, FSSAI & Business Licences',
    'Trademark Search & Application Support',
    'Financial Documents & CMA Loan Pack',
    'Audit Schedules & Notice Coordination',
    'Monthly MIS & Management Reports',
    'Budget Preparation & Variance Analysis',
    'Cash-flow Forecasts & Expense Monitoring',
    'Profitability, KPI & Trend Dashboards',
    'Coordinated Service Desk Advisory (Full Scope)'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.businessType) {
      setErrorMsg('Please select your business type.');
      return;
    }
    if (!formData.serviceRequired) {
      setErrorMsg('Please select the service required.');
      return;
    }
    if (!formData.requirementDetails.trim() || formData.requirementDetails.length < 5) {
      setErrorMsg('Please describe your requirement or deadline.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmittedData(result);
        if (onSuccess) onSuccess(result);
      } else {
        setErrorMsg(result.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      console.error('Modal submit error:', err);
      setErrorMsg('Network error while connecting to FINOVARA Advisory desk.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmittedData(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-container consultation-modal-container animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="consult-badge-icon">■</div>
            <div>
              <h3 className="modal-title">Book an Advisory Consultation</h3>
              <p className="modal-subtitle">One Coordinated Service Desk • Direct Intake</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleClose} 
            className="btn-close-modal"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div className="form-alert form-alert-error animate-fade-in mb-3">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {submittedData ? (
            <div className="modal-success-state animate-fade-in">
              <CheckCircle size={48} className="modal-success-icon" />
              <h3>Consultation Registered!</h3>
              <div className="ref-highlight-box">
                <span>Reference ID:</span>
                <strong>{submittedData.referenceId}</strong>
              </div>
              <p className="modal-success-text">
                Your consultation request is logged in FINOVARA's Coordinated Service Desk. 
                Our senior advisory team will review your business type and requirements under 
                <strong> Stage 01: Understand</strong>.
              </p>
              <div className="modal-actions-centered">
                <button 
                  type="button" 
                  onClick={handleClose}
                  className="btn btn-forest"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="finovara-enquiry-form">
              
              <div className="form-row-2">
                <div className="form-field-group">
                  <label htmlFor="m_fullName" className="field-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="m_fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Rajan Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="m_phone" className="field-label">
                    Phone Number <span className="req-star">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="m_phone"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="m_email" className="field-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <input 
                  type="email" 
                  id="m_email"
                  name="email"
                  required
                  placeholder="e.g. rajan@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label htmlFor="m_businessType" className="field-label">
                    Business Type <span className="req-star">*</span>
                  </label>
                  <select 
                    id="m_businessType"
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select entity type...</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label htmlFor="m_serviceRequired" className="field-label">
                    Service Required <span className="req-star">*</span>
                  </label>
                  <select 
                    id="m_serviceRequired"
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select service required...</option>
                    {servicesList.map(srv => (
                      <option key={srv} value={srv}>{srv}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.selectedPackage && (
                <div className="selected-package-badge-row">
                  <span className="selected-tag-label">Selected Advisory Plan:</span>
                  <span className="selected-tag-val">{formData.selectedPackage}</span>
                </div>
              )}

              <div className="form-field-group">
                <label htmlFor="m_requirementDetails" className="field-label">
                  Brief Requirement / Deadline <span className="req-star">*</span>
                </label>
                <textarea 
                  id="m_requirementDetails"
                  name="requirementDetails"
                  required
                  rows={3}
                  placeholder="Tell us about your transaction volume, statutory deadlines, or specific accounts need..."
                  value={formData.requirementDetails}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-lime btn-block"
              >
                {loading ? 'Registering with Desk...' : 'CONFIRM & BOOK CONSULTATION'}
              </button>

              <div className="form-privacy-note text-center">
                <ShieldCheck size={13} />
                <span>Confidential review under FINOVARA operating controls.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
