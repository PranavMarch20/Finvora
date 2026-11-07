import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  MessageSquare, 
  ArrowRight
} from 'lucide-react';

export default function FAQSection({ onOpenEnquiry }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How are advisory package fees determined beyond the starting prices?',
      answer: 'Our starting prices (Essential: ₹2,999/mo, Business: ₹7,999/mo, MIS & Budgeting: ₹14,999/mo) reflect standard transaction thresholds for newly formed or lower-volume entities. The final monthly retainer depends on transaction volume (number of bank, UPI, and gateway entries), entity constitution (Sole Proprietor vs. LLP/Private Ltd), active GST registrations across multiple states, payroll headcount, and required reporting frequency.'
    },
    {
      question: 'What is the Maker-Checker review process?',
      answer: 'Our Maker-Checker control ensures that no voucher, tax calculation, GST return, or financial summary is uploaded or released without two independent levels of scrutiny. A designated accounts preparer compiles and reconciles the working data, which is subsequently reviewed by a senior finance lead before presentation to the client for final statutory sign-off.'
    },
    {
      question: 'How does FINOVARA handle CA certificates, statutory audits, and legal notices?',
      answer: 'As stated in our Professional Scope Note, reserved professional functions (such as CA attestations, tax audits, statutory ROC audits, and formal legal representations) are executed exclusively in coordination with qualified and registered independent professional partners. FINOVARA prepares the underlying financial schedules, turnover statements, and audit dossiers, ensuring seamless coordination without administrative friction.'
    },
    {
      question: 'What documents are required to begin our monthly onboarding?',
      answer: 'During Stage 01 (Understand) and Stage 02 (Scope & Onboard), we issue a comprehensive document checklist covering bank account statements (PDF & Excel), sales invoices, purchase bills, payment gateway summary reports, GST/IT portal login credentials or OTP authorizations, and previous year financial statements.'
    },
    {
      question: 'How do you prevent late filing penalties and interest charges?',
      answer: 'We operate under our "Deadline & Evidence" operating control. Each statutory deadline (GSTR-1 on the 11th, GSTR-3B on the 20th, TDS on the 7th) is reversed into a clear client input cut-off date. All submissions are supported by permanent digital filing evidence and government acknowledgment receipts.'
    },
    {
      question: 'Can we upgrade or modify our service scope as our business scales?',
      answer: 'Yes. Many clients start on the Essential package during incorporation or pilot phases and transition to the Business package once turnover and GST filing commences, or to MIS & Budgeting when seeking bank credit, investor reporting, or department-level cost control.'
    }
  ];

  return (
    <section id="faqs" className="section section-white faqs-section">
      <div className="container container-narrow">
        
        {/* Section Header */}
        <div className="section-head-block text-center">
          <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-heading">Everything you need to know about working with FINOVARA.</h2>
          <p className="section-lead mx-auto">
            Clear answers regarding our service delivery, pricing scope, maker-checker governance, and professional partner coordination.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="faqs-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button 
                  type="button" 
                  className="faq-question-btn"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq-q-text">{faq.question}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div id={`faq-answer-${idx}`} className="faq-answer-panel animate-fade-in">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Banner */}
        <div className="faq-support-box">
          <div className="support-box-left">
            <MessageSquare size={22} className="support-icon" />
            <div>
              <div className="support-title">Have a specific statutory or entity question?</div>
              <p className="support-desc">Our advisory team is ready to analyze your exact business structure.</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => onOpenEnquiry({ serviceRequired: 'General Advisory Inquiry' })}
            className="btn btn-forest btn-sm"
          >
            <span>Ask Our Advisory Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
