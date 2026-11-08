import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ChevronDown,
  Calculator
} from 'lucide-react';

export default function Packages({ onSelectPackage }) {
  const [showEstimator, setShowEstimator] = useState(false);

  const packages = [
    {
      id: 'essential',
      name: 'ESSENTIAL',
      price: '₹2,999',
      period: 'per month onwards',
      badge: 'Startups & Sole Proprietors',
      recommended: false,
      tagline: 'Ideal for independent professionals and small firms wanting reliable, organized books.',
      features: [
        'Basic bookkeeping',
        'Bank reconciliation',
        'Income & expense summary',
        'Compliance reminders'
      ],
      suitableFor: 'Freelancers, consultants & newly registered businesses'
    },
    {
      id: 'business',
      name: 'BUSINESS',
      price: '₹7,999',
      period: 'per month onwards',
      badge: 'RECOMMENDED ADVISORY PLAN',
      recommended: true,
      tagline: 'Complete operational finance backbone with active tax, GST, and statutory tracking.',
      features: [
        'Bookkeeping & ledger review',
        'GST/TDS support',
        'Monthly P&L and balance sheet',
        'Receivables/payables tracking',
        'Compliance calendar'
      ],
      suitableFor: 'Trading firms, LLPs, Private Ltd companies & growing businesses'
    },
    {
      id: 'mis-budgeting',
      name: 'MIS & BUDGETING',
      price: '₹14,999',
      period: 'per month onwards',
      badge: 'Growth & Management Control',
      recommended: false,
      tagline: 'Advanced CFO-level financial intelligence, variance analysis, and cash-flow discipline.',
      features: [
        'Monthly MIS reports',
        'Budget preparation',
        'Budget vs actual analysis',
        'Cash-flow forecast',
        'Profitability & KPI dashboards',
        'Management review pack'
      ],
      suitableFor: 'Funded startups, manufacturers, SMEs & scaling organisations'
    }
  ];

  return (
    <section id="packages" className="section packages-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block text-center">
          <h2 className="section-heading">Plans that fit your needs.</h2>
          <p className="section-lead mx-auto">
            Indicative starting prices; final fees depend on transaction volume, entity type, 
            registrations, payroll headcount, complexity and agreed deliverables.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-3 pricing-cards-grid">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`pricing-card ${pkg.recommended ? 'pricing-card-featured' : ''}`}
            >
              {/* Badge */}
              {pkg.recommended ? (
                <div className="featured-top-banner">
                  <Sparkles size={14} />
                  <span>{pkg.badge}</span>
                </div>
              ) : (
                <div className="standard-plan-badge">{pkg.badge}</div>
              )}

              <div className="pricing-card-header">
                <h3 className="plan-name">{pkg.name}</h3>
                
                <div className="plan-price-block">
                  <div className="price-display">
                    <span className="price-num">{pkg.price}</span>
                  </div>
                  <span className="price-period">{pkg.period}</span>
                </div>

                <p className="plan-tagline">{pkg.tagline}</p>
              </div>

              {/* Inclusions Feature List */}
              <div className="plan-features-block">
                <div className="features-list-title">What is included:</div>
                <ul className="features-list">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <div className="check-box-icon">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for */}
              <div className="plan-suitability">
                <span className="suitability-label">Target Fit:</span>
                <span className="suitability-val">{pkg.suitableFor}</span>
              </div>

              {/* Action Button */}
              <div className="pricing-card-footer">
                <button 
                  type="button"
                  onClick={() => onSelectPackage(pkg.name, pkg.price)}
                  className={`btn btn-block ${pkg.recommended ? 'btn-lime' : 'btn-outline-dark'}`}
                >
                  <span className="btn-mark">■</span>
                  <span>GET STARTED WITH {pkg.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Scope & Pricing Transparency Accordion */}
        <div className="scope-estimator-wrapper">
          <div className="estimator-toggle-bar">
            <div className="estimator-toggle-left">
              <Calculator size={20} className="estimator-icon" />
              <div>
                <h4 className="estimator-title">How do we determine final fees?</h4>
                <p className="estimator-subtitle">
                  FINOVARA operates with transparent, scope-based pricing. Explore the factors that shape your engagement.
                </p>
              </div>
            </div>
            <button 
              type="button" 
              className="btn btn-outline-dark btn-sm"
              onClick={() => setShowEstimator(!showEstimator)}
            >
              <span>{showEstimator ? 'Hide Pricing Guide' : 'Open Pricing & Scope Guide'}</span>
              <ChevronDown size={16} className={`chevron-rotate ${showEstimator ? 'open' : ''}`} />
            </button>
          </div>

          {showEstimator && (
            <div className="estimator-content animate-fade-in">
              <div className="grid-3 estimator-factors-grid">
                
                <div className="factor-card">
                  <div className="factor-title">1. Transaction Volume</div>
                  <p className="factor-desc">
                    Higher monthly bank, UPI, invoice or payment-gateway lines require proportional reconciliation cycles and maker-checker audit time.
                  </p>
                  <div className="factor-meta">Base plans cover up to 50–100 monthly transactions.</div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">2. Entity & Regulatory Scale</div>
                  <p className="factor-desc">
                    Private Limited Companies and LLPs carry statutory ROC filing, board resolutions, and mandatory auditor coordination needs compared to solo proprietorships.
                  </p>
                  <div className="factor-meta">Compliance calendars mapped to statutory dates.</div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">3. Reporting & MIS Frequency</div>
                  <p className="factor-desc">
                    Weekly flash reports, cash-flow projections, division-wise costing, and investor updates are integrated under the MIS & Budgeting tier.
                  </p>
                  <div className="factor-meta">Structured for executive decision-makers.</div>
                </div>

              </div>

              <div className="callout-box callout-forest mt-4">
                <div className="callout-content">
                  <strong>Strict Scope Guarantee:</strong> Under our <em>Scope Before Work</em> operating control, all package deliverables, cut-off dates, and any supplementary work are agreed upon in writing before invoices are raised. No unexpected surprise charges.
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
