import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  Inbox,
  ArrowRight
} from 'lucide-react';

export default function EnquirySection({ 
  initialValues = {}, 
  onSuccessEnquiry,
  onOpenAdmin 
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
  const [successData, setSuccessData] = useState(null);

  // Sync external pre-selected values
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

    // Client-side validations
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid work or personal email address.');
      return;
    }
    if (!formData.businessType) {
      setErrorMsg('Please select your business type from the dropdown.');
      return;
    }
    if (!formData.serviceRequired) {
      setErrorMsg('Please select the primary service required.');
      return;
    }
    if (!formData.requirementDetails.trim() || formData.requirementDetails.length < 5) {
      setErrorMsg('Please provide a brief description of your requirement or upcoming deadline.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessData(result);
        if (onSuccessEnquiry) onSuccessEnquiry(result);
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          businessType: '',
          serviceRequired: '',
          requirementDetails: '',
          selectedPackage: ''
        });
      } else {
        setErrorMsg(result.error || 'Failed to submit enquiry. Please check the details and try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Unable to connect to the advisory server. Please check your network or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section section-deep enquiry-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="enquiry-top-header">
          <span className="section-tag">04 / CONTACT &amp; ENQUIRY</span>
          <h2 className="section-heading">Let's make business simpler.</h2>
          <p className="section-lead">
            Connect directly with our Coordinated Service Desk. Tell us about your business structure, 
            service priorities, and deadlines to receive a structured scope proposal.
          </p>
        </div>

        <div className="grid-2 enquiry-main-grid">
          
          {/* Left Column: Client Contact Information & Launch Status */}
          <div className="contact-info-panel">
            
            <div className="panel-header-box">
              <span className="desk-online-badge">
                <span className="pulsing-green-dot"></span>
                <span>COORDINATED SERVICE DESK ACTIVE</span>
              </span>
              <h3 className="panel-title">Business Reach &amp; Service Desk</h3>
              <p className="panel-desc">
                Serving founders, proprietors, and enterprise managers across India with responsive digital delivery and dedicated desk support.
              </p>
            </div>

            <div className="contact-points-list">
              
              {/* Service Area */}
              <div className="contact-point-item">
                <div className="point-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="point-text-block">
                  <span className="point-label">SERVICE AREA</span>
                  <span className="point-value">Noida · Delhi NCR · Remote support across India</span>
                </div>
              </div>

              {/* Business Email */}
              <div className="contact-point-item">
                <div className="point-icon-box">
                  <Mail size={20} />
                </div>
                <div className="point-text-block">
                  <span className="point-label">BUSINESS EMAIL</span>
                  <div className="point-value-row">
                    <span className="point-value">advisory@finovara.in</span>
                    <span className="pending-badge">[Add official email before launch]</span>
                  </div>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="contact-point-item">
                <div className="point-icon-box">
                  <Phone size={20} />
                </div>
                <div className="point-text-block">
                  <span className="point-label">PHONE / WHATSAPP</span>
                  <div className="point-value-row">
                    <span className="point-value">+91 (To be confirmed)</span>
                    <span className="pending-badge">[Add contact number before launch]</span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="contact-point-item">
                <div className="point-icon-box">
                  <Clock size={20} />
                </div>
                <div className="point-text-block">
                  <span className="point-label">BUSINESS HOURS</span>
                  <div className="point-value-row">
                    <span className="point-value">Mon – Sat: 9:30 AM – 6:30 PM IST</span>
                    <span className="pending-badge">[Add confirmed hours before launch]</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Launch Checklist Box (From Page 5) */}
            <div className="launch-requirements-card">
              <div className="launch-card-title">
                <ShieldCheck size={16} />
                <span>Launch &amp; Integration Checklist</span>
              </div>
              <ul className="launch-checklist">
                <li>
                  <span className="check-bullet">✓</span>
                  <span>Enquiry API connected to Node.js / MongoDB backend</span>
                </li>
                <li>
                  <span className="check-bullet">⏳</span>
                  <span>Client to confirm official email, phone &amp; registered address</span>
                </li>
                <li>
                  <span className="check-bullet">✓</span>
                  <span>Privacy Policy, Terms of Service &amp; Disclaimer fully integrated</span>
                </li>
              </ul>
              <div className="preview-note-text">
                <strong>Preview note:</strong> Connect the form to an email, CRM or form service before public launch.
              </div>
              <button 
                type="button" 
                onClick={onOpenAdmin}
                className="btn btn-outline-white btn-sm mt-3"
              >
                <Inbox size={14} />
                <span>Inspect Database Enquiries ({successData ? '1+' : 'View'})</span>
              </button>
            </div>

          </div>

          {/* Right Column: Functional Enquiry Form */}
          <div className="enquiry-form-card">
            
            <div className="form-card-header">
              <h3 className="form-title">Consultation Enquiry Form</h3>
              <p className="form-subtext">Fields correspond to official FINOVARA intake specification.</p>
            </div>

            {errorMsg && (
              <div className="form-alert form-alert-error animate-fade-in">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {successData && (
              <div className="form-alert form-alert-success animate-fade-in">
                <CheckCircle size={20} className="success-icon" />
                <div className="success-content">
                  <div className="success-title">Enquiry Registered Successfully!</div>
                  <div className="success-ref">
                    Reference ID: <strong>{successData.referenceId}</strong>
                  </div>
                  <p className="success-next">{successData.nextStep}</p>
                  <button 
                    type="button" 
                    onClick={() => setSuccessData(null)}
                    className="btn btn-sm btn-lime mt-2"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="finovara-enquiry-form">
              
              {/* Full Name & Phone Number */}
              <div className="form-row-2">
                <div className="form-field-group">
                  <label htmlFor="fullName" className="field-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Rajan Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="phone" className="field-label">
                    Phone Number <span className="req-star">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="form-field-group">
                <label htmlFor="email" className="field-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. rajan@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Business Type */}
              <div className="form-field-group">
                <label htmlFor="businessType" className="field-label">
                  Business Type <span className="req-star">*</span>
                </label>
                <select 
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select your entity classification...</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Service Required */}
              <div className="form-field-group">
                <label htmlFor="serviceRequired" className="field-label">
                  Service Required <span className="req-star">*</span>
                </label>
                <select 
                  id="serviceRequired"
                  name="serviceRequired"
                  required
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select service priority...</option>
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              {/* Package tag (if selected from pricing section) */}
              {formData.selectedPackage && (
                <div className="selected-package-badge-row">
                  <span className="selected-tag-label">Selected Advisory Plan:</span>
                  <span className="selected-tag-val">{formData.selectedPackage}</span>
                  <button 
                    type="button" 
                    className="btn-clear-tag" 
                    onClick={() => setFormData(p => ({ ...p, selectedPackage: '' }))}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Brief requirement / deadline */}
              <div className="form-field-group">
                <label htmlFor="requirementDetails" className="field-label">
                  Brief Requirement / Deadline <span className="req-star">*</span>
                </label>
                <textarea 
                  id="requirementDetails"
                  name="requirementDetails"
                  required
                  rows={4}
                  placeholder="Provide context regarding transaction volumes, pending GST returns, entity incorporation, or statutory cut-off dates..."
                  value={formData.requirementDetails}
                  onChange={handleChange}
                  className="form-textarea"
                />
                <span className="field-helper">Minimum 10 characters. Include any urgent statutory deadlines.</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-lime btn-block submit-enquiry-btn"
              >
                {loading ? (
                  <span>Processing Registration...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>SUBMIT ENQUIRY TO SERVICE DESK</span>
                  </>
                )}
              </button>

              <div className="form-privacy-note">
                <ShieldCheck size={14} />
                <span>Your details are processed under our strict scope governance and confidentiality controls.</span>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
