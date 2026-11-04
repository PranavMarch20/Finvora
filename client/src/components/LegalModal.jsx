import React from 'react';
import { X, ShieldCheck, AlertTriangle, Scale } from 'lucide-react';
import useDialog from '../useDialog';

export default function LegalModal({ isOpen, mode = 'privacy', onClose }) {
  const dialogRef = useDialog(isOpen, onClose);

  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'Commitment to financial record security, DPDP compliance, and client confidentiality.',
      icon: ShieldCheck,
      body: (
        <div className="legal-text-content">
          <h4>1. Introduction & Scope</h4>
          <p>
            FINOVARA – Finance & Business Advisory ("FINOVARA", "we", "us", or "our") respects the privacy and confidentiality of our clients, prospective clients, and website visitors. This policy governs how we collect, process, maintain, and protect confidential financial information, business records, and personal identifying information under the Digital Personal Data Protection (DPDP) Act, 2023, and applicable Indian regulatory standards.
          </p>

          <h4>2. Information We Collect</h4>
          <p>
            Through our website consultation forms and subsequent onboarding under our <em>Scope & Onboard</em> process, we may collect:
          </p>
          <ul>
            <li><strong>Contact Identifiers:</strong> Full legal name, professional email address, telephone/WhatsApp contact numbers, and registered office location.</li>
            <li><strong>Business & Entity Data:</strong> Entity constitution (Proprietorship, LLP, Private Limited Company, SME), industry classification, turnover scale, and transaction volumes.</li>
            <li><strong>Financial Records:</strong> Bank statements, GST credentials, purchase/sales registers, payroll data, and financial statements provided strictly for bookkeeping, tax preparation, and MIS compilation.</li>
          </ul>

          <h4>3. Purpose and Legal Basis of Processing</h4>
          <p>
            Client records are processed solely for the performance of our contracted advisory, accounting, compliance, and financial documentation services. We do not sell, rent, monetize, or disclose client financial data to any third-party marketing entities.
          </p>

          <h4>4. Confidentiality & Security Measures</h4>
          <p>
            In alignment with our <em>Built-In Operating Controls</em>, client records and task registers are accessed strictly on a need-to-know basis by authorized preparers (makers) and reviewers (checkers). All digital exchanges occur over encrypted transmission channels.
          </p>

          <h4>5. Professional Partner Disclosure</h4>
          <p>
            Where an engagement encompasses reserved statutory functions (such as CA audit coordination, statutory attestations, or legal opinions), relevant financial schedules are shared exclusively with appropriately registered and authorized independent professionals subject to reciprocal confidentiality obligations.
          </p>

          <h4>6. Retention and Erasure</h4>
          <p>
            Financial working papers and tax filing evidence are retained in accordance with Indian statutory requirements under the Companies Act, GST Act, and Income-tax Act, following which records are securely archived or purged.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service & Engagement Standards',
      subtitle: 'Operating rules, mutual responsibilities, and advisory engagement framework.',
      icon: Scale,
      body: (
        <div className="legal-text-content">
          <h4>1. Engagement Principles</h4>
          <p>
            All professional relationships initiated through FINOVARA are governed by our cardinal operating control: <strong>Scope Before Work</strong>. No engagement commences without a written proposal detailing inclusions, exclusions, client responsibilities, deadlines, and agreed billing terms.
          </p>

          <h4>2. Client Responsibilities & Document Deadlines</h4>
          <p>
            Timely compliance requires proactive collaboration. Clients are responsible for providing authentic, complete, and un-tampered books, bank feeds, invoices, and expense vouchers on or before the mutually agreed monthly cut-off dates. FINOVARA cannot be held liable for statutory interest, late fees, or mismatch notices resulting from delayed, incomplete, or inaccurate records submitted after the agreed cut-off.
          </p>

          <h4>3. Maker-Checker Review & Client Sign-Off</h4>
          <p>
            Under our <em>Review Before Release</em> standard, all tax computations, GST returns, and financial reports undergo internal supervisory review. However, final submission to government portals requires formal written or digital verification and approval from the client’s designated authorized signatory.
          </p>

          <h4>4. Fees, Invoicing & Extra Work</h4>
          <p>
            Monthly package fees (Essential, Business, MIS & Budgeting) are billed in advance on an agreed schedule. Any special assignments, notice responses, historical ledger cleanups, or tasks exceeding the initial agreed scope will be separately estimated and billed in writing under our <em>Bill for All Work</em> operating control.
          </p>

          <h4>5. Intellectual Property & Work Papers</h4>
          <p>
            All custom spreadsheets, financial dashboards, and MIS frameworks developed by FINOVARA remain our proprietary methodology, licensed to the client for their internal management operations.
          </p>
        </div>
      )
    },
    disclaimer: {
      title: 'Professional Disclaimer & Scope Disclosures',
      subtitle: 'Statutory limitations, partner coordination protocols, and pricing notices.',
      icon: AlertTriangle,
      body: (
        <div className="legal-text-content">
          <div className="callout-box callout-forest mb-4">
            <h4 style={{ color: '#123D2B', marginTop: 0 }}>Official Professional Scope Note:</h4>
            <p style={{ color: '#10271D', fontWeight: 600 }}>
              "Certificates, audits, attestations and reserved professional functions are issued or performed only by appropriately qualified and authorised professionals where required. Fees and acceptance depend on eligibility, verification and the recipient's prescribed format."
            </p>
          </div>

          <h4>1. Advisory Nature of FINOVARA Services</h4>
          <p>
            FINOVARA is a finance and business advisory practice specializing in accounting, bookkeeping, management reporting (MIS), tax compilation support, and financial documentation. We are not a Chartered Accountancy firm, Company Secretary practice, or Law firm under statutory bar. Where clients require reserved professional services—including but not limited to statutory audits under the Companies Act, tax audits under Section 44AB of the Income-tax Act, CA net worth certificates, or ROC certifications—FINOVARA acts as a facilitating coordinator that prepares the financial working schedules and interfaces with licensed independent practitioners.
          </p>

          <h4>2. Indicative Starting Prices Notice</h4>
          <p>
            All prices presented on this website (such as Essential: ₹2,999/mo onwards; Business: ₹7,999/mo onwards; MIS & Budgeting: ₹14,999/mo onwards) are indicative baseline rates. Formal fees are quoted on a case-by-case basis based on transaction volume, entity type, registration states, payroll size, and customized deliverables agreed upon in the engagement letter.
          </p>

          <h4>3. No Guarantee of Third-Party Approval</h4>
          <p>
            While FINOVARA prepares financial packs and CMA projections with rigorous diligence, the sanction of bank loans, credit limits, vendor tenders, or regulatory approvals remains at the sole discretion of the respective lending institutions, tendering authorities, or government bodies.
          </p>

        </div>
      )
    }
  };

  const current = contentMap[mode] || contentMap.privacy;
  const Icon = current.icon;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        ref={dialogRef}
        className="modal-container legal-modal-container animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        tabIndex={-1}
      >
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="legal-icon-box">
              <Icon size={22} />
            </div>
            <div>
              <h3 id="legal-dialog-title" className="modal-title">{current.title}</h3>
              <p className="modal-subtitle">{current.subtitle}</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-close-modal"
            aria-label="Close dialog"
            data-dialog-autofocus
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body legal-modal-body">
          {current.body}
        </div>

        <div className="modal-footer">
          <span className="legal-badge-pill">FINOVARA Legal & Compliance Governance</span>
          <button type="button" onClick={onClose} className="btn btn-forest btn-sm">
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
