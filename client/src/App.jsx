import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import AuthModal from './components/AuthModal';
import { authClient } from './lib/auth-client';

export default function App() {
  const { data: session } = authClient.useSession();
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'signin' });
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, mode: 'privacy' });

  // State to hold pre-filled values for the main on-page form
  const [formInitialValues, setFormInitialValues] = useState({
    fullName: '',
    email: '',
    businessType: '',
    serviceRequired: '',
    selectedPackage: ''
  });

  // Keep form initialized with logged-in user profile if available
  useEffect(() => {
    if (session?.user) {
      setFormInitialValues(prev => ({
        ...prev,
        fullName: prev.fullName || session.user.name || '',
        email: prev.email || session.user.email || ''
      }));
    }
  }, [session]);

  // Fetch count on load
  const loadCount = async () => {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiryCount(data.count || (data.enquiries ? data.enquiries.length : 0));
      }
    } catch {
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

  const handleOpenAuth = (mode = 'signin') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleOpenLegal = (mode = 'privacy') => {
    setLegalModalState({ isOpen: true, mode });
  };

  const handleEnquirySuccess = () => {
    loadCount();
  };

  return (
    <div className="finovara-app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Navigation Header */}
      <Navbar 
        onOpenEnquiry={() => handleOpenConsultModal()} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        enquiryCount={enquiryCount}
        onOpenAuth={handleOpenAuth}
        session={session}
        onSignOut={handleSignOut}
      />

      <main id="main-content">
        {/* 1. Hero & Coordinated Service Desk */}
        <Hero 
          onOpenEnquiry={() => handleOpenConsultModal()} 
          onSelectService={handleSelectService}
        />

        {/* 2. 01 / Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 3. 02 / Packages & Pricing Section */}
        <Packages onSelectPackage={handleSelectPackage} />

        {/* 4. How It Works: Four Stages */}
        <HowItWorks onOpenEnquiry={handleOpenConsultModal} />

        {/* 5. Built-in Operating Controls */}
        <OperatingControls />

        {/* 6. 03 / Target Customers (Stages of Business) */}
        <TargetCustomers onSelectCustomerType={handleSelectCustomerType} />

        {/* 7. Certificates & Documentation */}
        <Certificates onOpenEnquiry={handleOpenConsultModal} />

        {/* 8. 04 / Contact & Enquiry Form */}
        <EnquirySection 
          initialValues={formInitialValues}
          onSuccessEnquiry={handleEnquirySuccess}
        />

        {/* 9. FAQs Section */}
        <FAQSection onOpenEnquiry={handleOpenConsultModal} />
      </main>

      {/* 10. Footer */}
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

      {/* Better Auth Login / Signup Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
