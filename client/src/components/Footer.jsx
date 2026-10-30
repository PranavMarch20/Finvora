import React from 'react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  FileText,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function Footer({ onOpenLegal, onOpenEnquiry, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      
      {/* Top Advisory Strip */}
      <div className="footer-top-strip">
        <div className="container footer-strip-content">
          <div className="strip-branding">
            <span className="strip-f-mark">■</span>
            <span>FINOVARA COORDINATED ADVISORY DESK</span>
          </div>
          <div className="strip-contact-meta">
            <span>Noida · Delhi NCR · Remote Support Across India</span>
            <button 
              type="button" 
              onClick={scrollToTop} 
              className="btn-scroll-top"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container footer-main-content">
        <div className="footer-grid">
          
          {/* Column 1: Brand & Positioning */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span>F</span>
              </div>
              <div>
                <div className="footer-brand-name">FINOVARA</div>
                <div className="footer-brand-sub">FINANCE &amp; BUSINESS ADVISORY</div>
              </div>
            </div>

            <p className="footer-bio">
              From everyday bookkeeping to tax compliance, business registrations and financial reporting, 
              FINOVARA helps individuals and businesses stay organised, informed and ready for what comes next.
            </p>

            <div className="footer-palette-tag">
              <span className="dot dot-forest"></span>
              <span className="dot dot-lime"></span>
              <span className="dot dot-white"></span>
              <span className="dot dot-deep"></span>
              <span className="palette-label">Brand Palette Spec: #123D2B • #B8E04A • #F5F8F3 • #10271D</span>
            </div>
          </div>

          {/* Column 2: Coordinated Service Desk */}
          <div className="footer-col">
            <h4 className="footer-heading">Service Desk Pillars</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#services" className="footer-link">
                  <span className="link-num">01</span> Accounting &amp; Bookkeeping
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <span className="link-num">02</span> Tax &amp; Statutory Compliance
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <span className="link-num">03</span> Registrations &amp; Licences
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <span className="link-num">04</span> MIS &amp; Budgeting
                </a>
              </li>
              <li>
                <a href="#certificates" className="footer-link">
                  <span className="link-num">05</span> Certificates &amp; CMA Packs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Fixed Packages Recap */}
          <div className="footer-col">
            <h4 className="footer-heading">Advisory Packages</h4>
            <ul className="footer-packages-list">
              <li>
                <a href="#packages" className="footer-pkg-item">
                  <div className="pkg-item-head">
                    <span className="pkg-name">ESSENTIAL</span>
                    <span className="pkg-price">₹2,999/mo*</span>
                  </div>
                  <span className="pkg-desc">Bookkeeping, reconciliations &amp; summaries</span>
                </a>
              </li>
              <li>
                <a href="#packages" className="footer-pkg-item footer-pkg-featured">
                  <div className="pkg-item-head">
                    <span className="pkg-name">BUSINESS</span>
                    <span className="pkg-price">₹7,999/mo*</span>
                  </div>
                  <span className="pkg-desc">Ledgers, GST/TDS, P&amp;L &amp; compliance calendar</span>
                </a>
              </li>
              <li>
                <a href="#packages" className="footer-pkg-item">
                  <div className="pkg-item-head">
                    <span className="pkg-name">MIS &amp; BUDGETING</span>
                    <span className="pkg-price">₹14,999/mo*</span>
                  </div>
                  <span className="pkg-desc">Variance analysis, cash flow &amp; KPI dashboards</span>
                </a>
              </li>
            </ul>
            <span className="indicative-note">*Indicative starting prices as per client specification.</span>
          </div>

          {/* Column 4: Operational Governance & Launch Verification */}
          <div className="footer-col">
            <h4 className="footer-heading">Operating Governance</h4>
            <ul className="footer-links-list">
              <li><a href="#controls" className="footer-link">Scope Before Work Standard</a></li>
              <li><a href="#controls" className="footer-link">One Central Task Register</a></li>
              <li><a href="#controls" className="footer-link">Maker-Checker Review Protocol</a></li>
              <li><a href="#controls" className="footer-link">Deadline &amp; Evidence Log</a></li>
              <li><a href="#process" className="footer-link">Four-Stage Working Method</a></li>
            </ul>

            <div className="admin-quick-link-box mt-3">
              <button 
                type="button" 
                onClick={onOpenAdmin} 
                className="btn-admin-drawer"
              >
                <span>Desk Enquiry Viewer (Client Preview)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Professional Scope Note Bar */}
        <div className="footer-scope-note-bar">
          <p>
            <strong>Professional Scope Note:</strong> Certificates, audits, attestations and reserved professional functions are issued or performed only by appropriately qualified and authorised professionals where required. Fees and acceptance depend on eligibility, verification and the recipient's prescribed format.
          </p>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © 2026 FINOVARA – Finance &amp; Business Advisory. All rights reserved.
          </div>

          <div className="legal-links-row">
            <button 
              type="button" 
              onClick={() => onOpenLegal('privacy')}
              className="legal-btn"
            >
              Privacy Policy
            </button>
            <span className="sep">•</span>
            <button 
              type="button" 
              onClick={() => onOpenLegal('terms')}
              className="legal-btn"
            >
              Terms of Service
            </button>
            <span className="sep">•</span>
            <button 
              type="button" 
              onClick={() => onOpenLegal('disclaimer')}
              className="legal-btn"
            >
              Professional Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
