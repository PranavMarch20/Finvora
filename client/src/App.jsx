import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Services from './components/Services';
import Packages from './components/Packages';
import HowItWorks from './components/HowItWorks';
import OperatingControls from './components/OperatingControls';
import TargetCustomers from './components/TargetCustomers';
import Certificates from './components/Certificates';
import EnquirySection from './components/EnquirySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import AdminEnquiriesModal from './components/AdminEnquiriesModal';
import LegalModal from './components/LegalModal';

export default function App() {
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, mode: 'privacy' });

  // State to hold pre-filled values for the main on-page form
  const [formInitialValues, setFormInitialValues] = useState({
    businessType: '',
    serviceRequired: '',
    selectedPackage: ''
  });

  // Fetch count on load
  const loadCount = async () => {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiryCount(data.count || (data.enquiries ? data.enquiries.length : 0));
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    loadCount();
  }, []);

  // When user clicks a service item
  const handleSelectService = (category, serviceName) => {
    setFormInitialValues(prev => ({
      ...prev,
      serviceRequired: serviceName || 'General Advisory'
    }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks a package
  const handleSelectPackage = (packageName, price) => {
    setFormInitialValues(prev => ({
      ...prev,
      selectedPackage: `${packageName} (${price})`,
      serviceRequired: packageName === 'MIS & BUDGETING' 
        ? 'Monthly MIS & Management Reports' 
        : packageName === 'BUSINESS'
        ? 'Accounting & Bookkeeping + GST/TDS'
        : 'Accounting & Bookkeeping'
    }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks customer stage
  const handleSelectCustomerType = (customerType) => {
    setFormInitialValues(prev => ({
      ...prev,
      businessType: customerType
    }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultModal = (customValues = {}) => {
    setFormInitialValues(prev => ({
      ...prev,
      ...customValues
    }));
    setIsConsultModalOpen(true);
  };

  const handleOpenLegal = (mode = 'privacy') => {
    setLegalModalState({ isOpen: true, mode });
  };

  const handleEnquirySuccess = () => {
    loadCount();
  };

  return (
    <div className="finovara-app">
      {/* Navigation Header */}
      <Navbar 
        onOpenEnquiry={() => handleOpenConsultModal()} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        enquiryCount={enquiryCount}
      />

      <main id="main-content">
        {/* 1. Hero & Coordinated Service Desk */}
        <Hero 
          onOpenEnquiry={() => handleOpenConsultModal()} 
          onSelectService={handleSelectService}
        />

        {/* 2. Website Layout At A Glance (Overview) */}
        <Overview />

        {/* 3. 01 / Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 4. 02 / Packages & Pricing Section */}
        <Packages onSelectPackage={handleSelectPackage} />

        {/* 5. How It Works: Four Stages */}
        <HowItWorks onOpenEnquiry={handleOpenConsultModal} />

        {/* 6. Built-in Operating Controls */}
        <OperatingControls />

        {/* 7. 03 / Target Customers (Stages of Business) */}
        <TargetCustomers onSelectCustomerType={handleSelectCustomerType} />

        {/* 8. Certificates & Documentation */}
        <Certificates onOpenEnquiry={handleOpenConsultModal} />

        {/* 9. 04 / Contact & Enquiry Form */}
        <EnquirySection 
          initialValues={formInitialValues}
          onSuccessEnquiry={handleEnquirySuccess}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* 10. FAQs Section */}
        <FAQSection onOpenEnquiry={handleOpenConsultModal} />
      </main>

      {/* 11. Footer */}
      <Footer 
        onOpenLegal={handleOpenLegal}
        onOpenEnquiry={() => handleOpenConsultModal()}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Modals */}
      <EnquiryModal 
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        initialValues={formInitialValues}
        onSuccess={handleEnquirySuccess}
      />

      <AdminEnquiriesModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <LegalModal 
        isOpen={legalModalState.isOpen}
        mode={legalModalState.mode}
        onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
