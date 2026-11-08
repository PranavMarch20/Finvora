import React from 'react';
import { 
  FileSpreadsheet, 
  Users2, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function Certificates({ onOpenEnquiry }) {
  const financialDocs = [
    'Turnover and sales reconciliation schedules',
    'Net worth supporting statements',
    'Provisional / projected financial statements',
    'CMA data and bank-loan financial packs',
    'Stock, debtors and creditors statements',
    'Fund utilisation records',
    'Tender & vendor financial verification packs',
    'GST turnover and books reconciliation'
  ];

  const partnerCoordination = [
    'CA certificates and eligible attestations',
    'Statutory and tax audit coordination',
    'Cost certification / CMA assignments',
    'Secretarial certifications and eligible ROC work',
    'Legal opinions and complex tax notices',
    'Technical reports for selected regulatory licences'
  ];

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block">
          <h2 className="section-heading">Prepare the numbers. Coordinate the right professional.</h2>
          <p className="section-lead">
            When banks, tenders, authorities, or auditors request substantiated financial packs, FINOVARA compiles the underlying working papers and seamlessly coordinates with authorized independent professionals for statutory attestations.
          </p>
        </div>

        {/* Two Pillars Grid */}
        <div className="grid-2 certificates-grid">
          
          {/* Pillar 1: Financial Documentation */}
          <div className="cert-column-card">
            <div className="cert-col-header">
              <div className="cert-col-icon">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <span className="cert-col-badge">FINOVARA IN-HOUSE PREPARATION</span>
                <h3 className="cert-col-title">Financial Documentation</h3>
              </div>
            </div>

            <p className="cert-col-desc">
              We compile, reconcile, and mathematically structure the detailed financial statements, annexures, and schedules required by lenders and institutions:
            </p>

            <ul className="cert-items-list">
              {financialDocs.map((item, idx) => (
                <li key={idx} className="cert-list-item">
                  <div className="cert-bullet">■</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="cert-col-action">
              <button 
                type="button" 
                onClick={() => onOpenEnquiry({ serviceRequired: 'Financial Documentation & CMA Loan Pack' })}
                className="btn btn-outline-dark btn-sm btn-block"
              >
                <span>Request Financial Documentation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Pillar 2: Professional Partner Coordination */}
          <div className="cert-column-card cert-column-partner">
            <div className="cert-col-header">
              <div className="cert-col-icon cert-partner-icon">
                <Users2 size={24} />
              </div>
              <div>
                <span className="cert-col-badge badge-partner">INDEPENDENT NETWORK LIAISON</span>
                <h3 className="cert-col-title">Professional Partner Coordination</h3>
              </div>
            </div>

            <p className="cert-col-desc">
              For reserved statutory functions, we interface directly with accredited Chartered Accountants, Company Secretaries, and legal counsels:
            </p>

            <ul className="cert-items-list">
              {partnerCoordination.map((item, idx) => (
                <li key={idx} className="cert-list-item">
                  <div className="cert-bullet cert-bullet-lime">■</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="cert-col-action">
              <button 
                type="button" 
                onClick={() => onOpenEnquiry({ serviceRequired: 'Professional Partner Coordination & Attestation' })}
                className="btn btn-forest btn-sm btn-block"
              >
                <span>Coordinate Professional Service</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Client Scope Limitation Note (Page 5 highlighted compliance card) */}
        <div className="professional-scope-callout">
          <div className="scope-callout-header">
            <ShieldCheck size={20} className="scope-alert-icon" />
            <span className="scope-callout-title">Professional Scope Note & Statutory Disclosure</span>
          </div>
          <p className="scope-callout-text">
            <strong>Professional scope note:</strong> Certificates, audits, attestations and reserved professional functions are issued or performed only by appropriately qualified and authorised professionals where required. Fees and acceptance depend on eligibility, verification and the recipient's prescribed format.
          </p>
        </div>

      </div>
    </section>
  );
}
