import React from 'react';
import { 
  Compass, 
  FileCheck, 
  GitMerge, 
  CheckCircle2
} from 'lucide-react';

export default function HowItWorks({ onOpenEnquiry }) {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      description: 'Confirm entity, needs, deadlines and transaction volumes.',
      details: 'We begin with an intake session to identify your legal structure, existing accounts status, transaction volume, pending filings, and core business priorities.',
      deliverable: 'Initial Diagnostic & Requirements Mapping',
      icon: Compass
    },
    {
      num: '02',
      title: 'Scope & onboard',
      description: 'Agree proposal, document checklist and timeline.',
      details: 'You receive a detailed written scope of inclusions, responsibilities, cut-off dates, and agreed communication rhythm. Clear document checklist provided.',
      deliverable: 'Signed Engagement & Document Vault Setup',
      icon: FileCheck
    },
    {
      num: '03',
      title: 'Prepare & review',
      description: 'Prepare and reconcile records; review before submission.',
      details: 'Every ledger, return, voucher and calculation passes our maker-checker review protocol. Books are matched against bank feeds and tax ledgers with full audit trails.',
      deliverable: 'Maker-Checker Verified Drafts & Working Papers',
      icon: GitMerge
    },
    {
      num: '04',
      title: 'Deliver & track',
      description: 'Share reports, evidence and upcoming actions.',
      details: 'Filing acknowledgments, challans, monthly financial statements and MIS packs are transmitted with a clear preview of next month statutory deadlines.',
      deliverable: 'Proof of Filing, P&L Packs & Action Register',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="process" className="section section-dark how-it-works-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block text-center">
          <span className="section-tag">HOW IT WORKS</span>
          <h2 className="section-heading">A disciplined four-stage working method.</h2>
          <p className="section-lead mx-auto">
            From initial intake to monthly delivery, our engagement is transparent, milestone-governed, and structured to remove uncertainty from your business finances.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow Grid */}
        <div className="grid-4 process-flow-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="process-card">
                
                <div className="process-card-top">
                  <div className="process-step-indicator">
                    <span className="step-number">{step.num}</span>
                  </div>
                  <Icon size={24} className="step-icon" />
                </div>

                <h3 className="process-title">{step.title}</h3>
                <p className="process-summary">{step.description}</p>

                <div className="process-details-box">
                  <p className="process-detail-text">{step.details}</p>
                </div>

                <div className="process-deliverable-badge">
                  <span className="deliverable-tag">Milestone Output:</span>
                  <span className="deliverable-name">{step.deliverable}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Process CTA Footer */}
        <div className="process-cta-banner">
          <div className="process-cta-text">
            <h4>Ready to start Stage 01?</h4>
            <p>Share your requirement to receive our preliminary document checklist and scope draft.</p>
          </div>
          <button 
            type="button"
            onClick={() => onOpenEnquiry({ serviceRequired: 'Stage 01: Initial Understand Consultation' })}
            className="btn btn-lime"
          >
            <span className="btn-mark">■</span>
            <span>START STAGE 01 CONSULTATION</span>
          </button>
        </div>

      </div>
    </section>
  );
}
