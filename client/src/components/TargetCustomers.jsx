import React from 'react';
import { 
  User, 
  Store, 
  Rocket, 
  Factory, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export default function TargetCustomers({ onSelectCustomerType }) {
  const customerSegments = [
    {
      id: 'Individuals & Freelancers',
      title: 'Individuals & Freelancers',
      tagline: 'Tax return preparation and organised personal records.',
      icon: User,
      highlights: [
        'Organised personal income ledgers',
        'Capital gains & foreign freelance income computation',
        'Tax deductions (80C, 80D, 80CCD) optimisation',
        'Timely ITR filing & refund tracking'
      ],
      idealFor: 'Independent consultants, creators, software engineers, and gig professionals'
    },
    {
      id: 'Proprietors & Partnerships',
      title: 'Proprietors & Partnerships',
      tagline: 'Books, GST support, TDS and business reporting.',
      icon: Store,
      highlights: [
        'Monthly sales, purchase & expense bookkeeping',
        'Accurate GST return reconciliation (GSTR-1, 3B)',
        'Vendor TDS deduction & challan deposit',
        'Periodic balance sheet for banking & trade credit'
      ],
      idealFor: 'Retail traders, distributors, professional firms, and service contractors'
    },
    {
      id: 'Startups, LLPs & Companies',
      title: 'Startups, LLPs & Companies',
      tagline: 'Accounting, recurring compliance and management reports.',
      icon: Rocket,
      highlights: [
        'End-to-end statutory MCA & ROC annual filing compliance',
        'Multi-currency ledger & payment gateway reconciliations',
        'Payroll administration with PF, ESI & professional tax',
        'Investor-grade monthly MIS reports & cap-table tracking'
      ],
      idealFor: 'Venture-funded startups, technology companies, and incorporated entities'
    },
    {
      id: 'SMEs & Manufacturers',
      title: 'SMEs & Manufacturers',
      tagline: 'Inventory, costing, working capital and financial controls.',
      icon: Factory,
      highlights: [
        'Raw material, WIP & finished goods inventory accounting',
        'Product costing, bill of materials (BOM) & margin analysis',
        'Working capital management & bank drawing power statements',
        'CMA data packs for CC limits and term-loan renewals'
      ],
      idealFor: 'Engineering firms, manufacturing plants, exporters, and logistics enterprises'
    }
  ];

  const handleSegmentKeyDown = (event, customerType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectCustomerType(customerType);
    }
  };

  return (
    <section id="customers" className="section target-customers-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block text-center">
          <h2 className="section-heading">Built for every stage of business.</h2>
          <p className="section-lead mx-auto">
            From independent professionals filing returns to medium-sized manufacturers managing complex working capital cycles, FINOVARA tailors its service structure to match your operational reality.
          </p>
        </div>

        {/* 4 Customer Segment Cards */}
        <div className="grid-2 customer-segments-grid">
          {customerSegments.map((segment) => {
            const Icon = segment.icon;
            return (
              <div 
                key={segment.id} 
                className="customer-segment-card"
                onClick={() => onSelectCustomerType(segment.id)}
                onKeyDown={(event) => handleSegmentKeyDown(event, segment.id)}
                role="button"
                tabIndex={0}
                aria-label={`Enquire as ${segment.title}`}
              >
                <div className="segment-card-header">
                  <div className="segment-icon-box">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="segment-title">{segment.title}</h3>
                    <p className="segment-tagline">{segment.tagline}</p>
                  </div>
                </div>

                <div className="segment-body">
                  <ul className="segment-highlights-list">
                    {segment.highlights.map((point, idx) => (
                      <li key={idx} className="segment-point">
                        <CheckCircle2 size={15} className="segment-check" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="segment-ideal-strip">
                    <span className="ideal-label">Suited for:</span>
                    <span className="ideal-text">{segment.idealFor}</span>
                  </div>
                </div>

                <div className="segment-card-action">
                  <span className="action-label">Enquire as {segment.title}</span>
                  <ArrowRight size={16} className="action-arrow" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
