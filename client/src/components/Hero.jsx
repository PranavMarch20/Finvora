import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart3, 
  FileCheck2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Hero({ onOpenEnquiry, onSelectService }) {
  const serviceDeskItems = [
    { number: '01', title: 'Accounting & Bookkeeping', category: 'accounting' },
    { number: '02', title: 'Tax & Statutory Compliance', category: 'tax-gst' },
    { number: '03', title: 'Registrations & Licences', category: 'compliance-setup' },
    { number: '04', title: 'MIS & Budgeting', category: 'profitability-planning' },
  ];

  return (
    <section className="hero-section">
      <div className="container hero-container">
        
        {/* Left Column: Hero Editorial Content */}
        <div className="hero-editorial">
          
          <div className="hero-subhead-strip">
            <span className="strip-item">ACCOUNTING</span>
            <span className="strip-bullet">•</span>
            <span className="strip-item">TAXATION</span>
            <span className="strip-bullet">•</span>
            <span className="strip-item">COMPLIANCE</span>
            <span className="strip-bullet">•</span>
            <span className="strip-item">BUSINESS ADVISORY</span>
          </div>

          <h1 className="hero-title">
            Clarity in your numbers.<br />
            <span className="highlight-text">Confidence</span> in your business.
          </h1>

          <p className="hero-description">
            From everyday bookkeeping to tax compliance, business registrations and financial reporting, 
            <strong> FINOVARA</strong> helps individuals and businesses stay organised, informed and ready for what comes next.
          </p>

          <div className="hero-cta-group">
            <button 
              type="button" 
              onClick={() => onOpenEnquiry()}
              className="btn btn-lime hero-btn-main"
            >
              <span className="btn-mark">■</span>
              <span>BOOK A CONSULTATION</span>
            </button>

            <a 
              href="#services" 
              className="btn btn-outline-white hero-btn-sub"
            >
              <span className="btn-mark">■</span>
              <span>EXPLORE SERVICES</span>
            </a>
          </div>

          {/* Quick Metrics / Operating Discipline Badges */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Scope Before Work Protocol</span>
            </div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Maker-Checker Review Standard</span>
            </div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Timely Statutory Deadlines</span>
            </div>
          </div>

        </div>

        {/* Right Column: One Coordinated Service Desk Card (Exact layout from Page 1) */}
        <div className="hero-desk-wrapper">
          <div className="service-desk-card">
            
            <div className="desk-header">
              <div className="desk-badge">
                <span className="desk-indicator"></span>
                <span className="desk-tag">ONE COORDINATED SERVICE DESK</span>
              </div>
              <h2 className="desk-headline">
                Business essentials,<br />
                managed with care.
              </h2>
            </div>

            <div className="desk-items-list">
              {serviceDeskItems.map((item) => (
                <div 
                  key={item.number} 
                  className="desk-item"
                  onClick={() => onSelectService(item.category, item.title)}
                  role="button"
                  tabIndex={0}
                  title={`Enquire for ${item.title}`}
                >
                  <span className="desk-num">{item.number}</span>
                  <span className="desk-name">{item.title}</span>
                  <ArrowRight size={16} className="desk-arrow" />
                </div>
              ))}
            </div>

            <div className="desk-footer">
              <div className="desk-meta">
                <ShieldCheck size={18} className="desk-meta-icon" />
                <span>Single point accountability with professional partner coordination</span>
              </div>
              <button 
                type="button"
                onClick={() => onOpenEnquiry({ serviceRequired: 'Coordinated Service Desk Advisory' })}
                className="desk-action-link"
              >
                <span>Request desk onboarding</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
