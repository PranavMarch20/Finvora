import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Inbox, 
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  onOpenEnquiry, 
  onOpenAdmin, 
  enquiryCount = 0,
  onOpenAuth,
  session,
  onSignOut 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopOthersOpen, setDesktopOthersOpen] = useState(false);
  const [mobileOthersOpen, setMobileOthersOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const desktopOthersRef = useRef(null);
  const desktopOthersTriggerRef = useRef(null);
  const firstDesktopOtherLinkRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const userDropdownRef = useRef(null);
  const othersCloseTimerRef = useRef(null);

  const handleOthersMouseEnter = () => {
    if (othersCloseTimerRef.current) {
      clearTimeout(othersCloseTimerRef.current);
      othersCloseTimerRef.current = null;
    }
    setDesktopOthersOpen(true);
  };

  const handleOthersMouseLeave = () => {
    if (othersCloseTimerRef.current) {
      clearTimeout(othersCloseTimerRef.current);
    }
    othersCloseTimerRef.current = setTimeout(() => {
      setDesktopOthersOpen(false);
    }, 180);
  };

  const getUserInitials = (name = '') => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!desktopOthersRef.current?.contains(event.target)) {
        setDesktopOthersOpen(false);
      }
      if (!userDropdownRef.current?.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      if (userDropdownOpen) {
        setUserDropdownOpen(false);
      }

      if (desktopOthersOpen) {
        setDesktopOthersOpen(false);
        desktopOthersTriggerRef.current?.focus();
      }

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileOthersOpen(false);
        window.requestAnimationFrame(() => mobileToggleRef.current?.focus());
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopOthersOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const primaryLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ];

  const secondaryLinks = [
    { label: 'Clients', href: '#customers' },
    { label: 'How It Works', href: '#process' },
    { label: 'Controls', href: '#controls' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'FAQs', href: '#faqs' },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileOthersOpen(false);
  };

  const handleDesktopOthersKeyDown = (event) => {
    if (event.key !== 'ArrowDown') return;

    event.preventDefault();
    setDesktopOthersOpen(true);
    window.requestAnimationFrame(() => firstDesktopOtherLinkRef.current?.focus());
  };

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
            {primaryLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="nav-item"
              >
                {link.label}
              </a>
            ))}

            <div
              ref={desktopOthersRef}
              className={`desktop-others ${desktopOthersOpen ? 'is-open' : ''}`}
              onMouseEnter={handleOthersMouseEnter}
              onMouseLeave={handleOthersMouseLeave}
            >
              <button
                ref={desktopOthersTriggerRef}
                type="button"
                className="nav-item nav-dropdown-trigger"
                aria-haspopup="menu"
                aria-expanded={desktopOthersOpen}
                aria-controls="desktop-others-menu"
                onClick={() => setDesktopOthersOpen((isOpen) => !isOpen)}
                onKeyDown={handleDesktopOthersKeyDown}
              >
                <span>Others</span>
                <ChevronDown size={15} className="nav-dropdown-icon" aria-hidden="true" />
              </button>
              <div id="desktop-others-menu" className="desktop-others-menu" role="menu">
                {secondaryLinks.map((link, index) => (
                  <a
                    key={link.href}
                    ref={index === 0 ? firstDesktopOtherLinkRef : null}
                    href={link.href}
                    className="desktop-others-link"
                    role="menuitem"
                    onClick={() => {
                      if (othersCloseTimerRef.current) clearTimeout(othersCloseTimerRef.current);
                      setDesktopOthersOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <button 
              ref={mobileToggleRef}
              type="button"
              onClick={onOpenAdmin}
              className="btn-leads-preview"
              title="View desk enquiries"
            >
              <Inbox size={16} />
              <span className="leads-label">Desk Enquiries</span>
              {enquiryCount > 0 && <span className="lead-count-badge">{enquiryCount}</span>}
            </button>

            {/* Authentication Button or User Profile Dropdown */}
            {session?.user ? (
              <div ref={userDropdownRef} className="user-nav-dropdown-wrap">
                <button
                  type="button"
                  className="btn-user-avatar"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User account menu"
                  title={`Signed in as ${session.user.name || session.user.email}`}
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="user-nav-avatar-img" />
                  ) : (
                    <span className="user-nav-avatar-initials">
                      {getUserInitials(session.user.name || session.user.email)}
                    </span>
                  )}
                  <span className="user-nav-name">
                    {session.user.name ? session.user.name.split(' ')[0] : 'Client'}
                  </span>
                  <ChevronDown size={14} className={`user-nav-chevron ${userDropdownOpen ? 'is-open' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu animate-fade-in" role="menu">
                    <div className="user-dropdown-header">
                      <div className="dropdown-user-name">{session.user.name || 'Advisory Client'}</div>
                      <div className="dropdown-user-email">{session.user.email}</div>
                      <span className="dropdown-verified-pill">Active Account</span>
                    </div>
                    <div className="user-dropdown-separator" />
                    <button
                      type="button"
                      className="user-dropdown-item"
                      role="menuitem"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenEnquiry();
                      }}
                    >
                      <Sparkles size={14} />
                      <span>Book Consultation</span>
                    </button>
                    <button
                      type="button"
                      className="user-dropdown-item"
                      role="menuitem"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdmin();
                      }}
                    >
                      <Inbox size={14} />
                      <span>Desk Enquiries ({enquiryCount})</span>
                    </button>
                    <div className="user-dropdown-separator" />
                    <button
                      type="button"
                      className="user-dropdown-item user-item-logout"
                      role="menuitem"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onSignOut) onSignOut();
                      }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth('signin')}
                className="btn-auth-trigger"
                title="Sign in or create account"
              >
                <User size={15} />
                <span>Log In / Sign Up</span>
              </button>
            )}

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
              onClick={() => {
                setMobileMenuOpen((isOpen) => !isOpen);
                setMobileOthersOpen(false);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="mobile-menu-drawer animate-fade-in" aria-label="Mobile navigation">
            <div className="mobile-links-list">
              {primaryLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
              <div className="mobile-others">
                <button
                  type="button"
                  className="mobile-nav-link mobile-others-trigger"
                  aria-expanded={mobileOthersOpen}
                  aria-controls="mobile-others-menu"
                  onClick={() => setMobileOthersOpen((isOpen) => !isOpen)}
                >
                  <span>Others</span>
                  <ChevronDown size={16} className={`mobile-others-icon ${mobileOthersOpen ? 'is-open' : ''}`} aria-hidden="true" />
                </button>
                {mobileOthersOpen && (
                  <div id="mobile-others-menu" className="mobile-others-menu">
                    {secondaryLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="mobile-other-link"
                        onClick={closeMobileMenu}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={15} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-menu-actions">
              {session?.user ? (
                <div className="mobile-user-card">
                  <div className="mobile-user-info">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="user-nav-avatar-img" />
                    ) : (
                      <span className="user-nav-avatar-initials">
                        {getUserInitials(session.user.name || session.user.email)}
                      </span>
                    )}
                    <div className="mobile-user-details">
                      <div className="mobile-user-name">{session.user.name || 'Advisory Client'}</div>
                      <div className="mobile-user-email">{session.user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-white btn-block btn-sm mt-2"
                    onClick={() => {
                      closeMobileMenu();
                      if (onSignOut) onSignOut();
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-white btn-block"
                  onClick={() => {
                    closeMobileMenu();
                    if (onOpenAuth) onOpenAuth('signin');
                  }}
                >
                  <User size={16} />
                  <span>Log In / Sign Up</span>
                </button>
              )}

              <button 
                type="button" 
                className="btn btn-lime btn-block"
                onClick={() => {
                  closeMobileMenu();
                  onOpenEnquiry();
                }}
              >
                ■ BOOK A CONSULTATION
              </button>
              <button 
                type="button"
                className="btn btn-outline-white btn-block"
                onClick={() => {
                  closeMobileMenu();
                  onOpenAdmin();
                }}
              >
                <Inbox size={16} />
                <span>Desk Enquiries ({enquiryCount})</span>
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
