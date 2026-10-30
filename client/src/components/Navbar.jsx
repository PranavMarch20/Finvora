import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  PhoneCall, 
  Inbox, 
  ShieldCheck, 
  FileText,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ onOpenEnquiry, onOpenAdmin, enquiryCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Clients', href: '#customers' },
    { label: 'How It Works', href: '#process' },
    { label: 'Controls', href: '#controls' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Advisory Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="banner-service-text">
            <span>ACCOUNTING</span>
            <span className="dot">•</span>
            <span>TAXATION</span>
            <span className="dot">•</span>
            <span>COMPLIANCE</span>
            <span className="dot">•</span>
            <span>BUSINESS ADVISORY</span>
          </div>
          <div className="banner-location">
            <span className="location-pill">Service Area: Noida · Delhi NCR · Remote across India</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          
          {/* Logo */}
          <a href="#" className="brand-logo" aria-label="FINOVARA Home">
            <div className="logo-icon-box">
              <span className="logo-char">F</span>
            </div>
            <div className="logo-text-block">
              <span className="brand-name">FINOVARA</span>
              <span className="brand-tagline">FINANCE & BUSINESS ADVISORY</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="nav-item"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Live Submissions Drawer Trigger (Client Preview) */}
            <button 
              type="button"
              onClick={onOpenAdmin}
              className="btn-leads-preview"
              title="View Received Enquiries (Client Preview)"
            >
              <Inbox size={16} />
              <span className="leads-label">Desk Enquiries</span>
              {enquiryCount > 0 && <span className="lead-count-badge">{enquiryCount}</span>}
            </button>

            {/* Book Consultation Button */}
            <button 
              type="button"
              onClick={() => onOpenEnquiry()}
              className="btn btn-lime btn-sm"
            >
              <span className="btn-square-mark">■</span>
              <span>BOOK A CONSULTATION</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer animate-fade-in">
            <div className="mobile-links-list">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
            </div>
            <div className="mobile-menu-actions">
              <button 
                type="button" 
                className="btn btn-lime btn-block"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
              >
                ■ BOOK A CONSULTATION
              </button>
              <button 
                type="button"
                className="btn btn-outline-white btn-block"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
              >
                <Inbox size={16} />
                <span>View Enquiries Desk ({enquiryCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
