import React from 'react';
import { 
  FileCheck2, 
  ListTodo, 
  CalendarClock, 
  UserCheck, 
  Receipt, 
  LineChart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function OperatingControls() {
  const controls = [
    {
      id: 'scope',
      num: '01',
      title: 'Scope before work',
      summary: 'Written inclusions, exclusions, responsibilities and extra-work fees.',
      description: 'Every assignment is anchored in a definitive written agreement. Client obligations, source document deadlines, and separate billing rates for out-of-scope tasks are specified before work commences.',
      keyPill: 'Zero Scope Ambiguity',
      icon: FileCheck2
    },
    {
      id: 'task-register',
      num: '02',
      title: 'One task register',
      summary: 'Owner, due date, reviewer, status, dependency and evidence link.',
      description: 'All client deliverables are managed through a centralized, live register. Every line item designates an accountable preparer, an assigned senior reviewer, dependency prerequisites, and a linked evidence repository.',
      keyPill: 'End-to-End Traceability',
      icon: ListTodo
    },
    {
      id: 'deadline-evidence',
      num: '03',
      title: 'Deadline & evidence',
      summary: 'Calendar, client cut-offs and proof of filing/payment.',
      description: 'Statutory deadlines are reversed into strict client input cut-offs. Every completed tax filing, challan payment, or ledger close is verified by permanent digital filing evidence and government acknowledgment numbers.',
      keyPill: 'Guaranteed Proof of Filing',
      icon: CalendarClock
    },
    {
      id: 'review-release',
      num: '04',
      title: 'Review before release',
      summary: 'Maker-checker review and required client approval.',
      description: 'No computation, GST return, or financial summary is released to the authorities or management without mandatory four-eyes verification by a qualified reviewer and written sign-off from the authorized client representative.',
      keyPill: 'Maker-Checker Protocol',
      icon: UserCheck
    },
    {
      id: 'bill-all-work',
      num: '05',
      title: 'Bill for all work',
      summary: 'Agreed advance/invoice, receivables and separate extra-work billing.',
      description: 'Predictable billing schedules with agreed advances, transparent recurring retainers, and itemized billing for special assignments. Healthy cash-flow governance ensures dedicated attention to your accounts.',
      keyPill: 'Transparent Billing',
      icon: Receipt
    },
    {
      id: 'measure-profitability',
      num: '06',
      title: 'Measure profitability',
      summary: 'Client-wise time, costs, collections and effective fee per hour.',
      description: 'We track team time allocation, processing velocity, and operational cost per engagement. This internal discipline guarantees that FINOVARA assigns the necessary senior hours required for high-grade compliance.',
      keyPill: 'Accountability & Focus',
      icon: LineChart
    }
  ];

  return (
    <section id="controls" className="section section-white operating-controls-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block">
          <div className="controls-header-badge">
            <ShieldCheck size={18} className="shield-icon" />
            <span className="section-tag">BUILT-IN OPERATING CONTROLS</span>
          </div>
          <h2 className="section-heading">Operational governance built for precision.</h2>
          <p className="section-lead">
            We operate with the rigorous internal quality controls expected of a tier-one advisory firm. 
            These six non-negotiable standards safeguard compliance, eliminate surprises, and maintain accountability across every account.
          </p>
        </div>

        {/* 6 Controls Grid */}
        <div className="grid-3 controls-grid">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <div key={control.id} className="control-card">
                
                <div className="control-card-header">
                  <div className="control-icon-circle">
                    <Icon size={20} />
                  </div>
                  <span className="control-num-badge">Control {control.num}</span>
                </div>

                <h3 className="control-title">{control.title}</h3>
                
                <div className="control-summary-pill">
                  <CheckCircle2 size={13} className="check-mini" />
                  <span>{control.summary}</span>
                </div>

                <p className="control-body-text">{control.description}</p>

                <div className="control-footer-meta">
                  <span className="control-tag-pill">{control.keyPill}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Advisory Quality Callout */}
        <div className="callout-box callout-forest mt-8">
          <div className="governance-banner">
            <div>
              <h4 className="governance-title">Client Peace of Mind Guarantee</h4>
              <p className="governance-text">
                By enforcing maker-checker reviews and clear document submission cut-offs, our clients avoid late fees, interest penalties, and statutory mismatch notices.
              </p>
            </div>
            <div className="governance-badge-right">
              <span className="badge-pill badge-forest">100% AUDIT-TRAIL COMPLIANCE</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
