import React, { useState } from 'react';
import { 
  BookOpen, 
  Receipt, 
  Building, 
  TrendingUp, 
  ArrowRight, 
  Search
} from 'lucide-react';

export default function Services({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategories = [
    {
      id: 'accounting',
      number: '01',
      title: 'ACCOUNTING',
      tagline: 'Books, records and reconciliations for better financial control.',
      icon: BookOpen,
      services: [
        {
          name: 'Accounting & bookkeeping',
          description: 'Day-to-day transaction recording, journal vouchers, and ledger maintenance.'
        },
        {
          name: 'Bank, ledger & payment gateway reconciliation',
          description: 'Comprehensive 2-way and 3-way reconciliations for banks, gateways, and vendor accounts.'
        },
        {
          name: 'Monthly closing & financial statements',
          description: 'Period-end closes, balance sheets, profit & loss statements, and cash position summaries.'
        },
        {
          name: 'Individual, freelancer & proprietor accounts',
          description: 'Clean personal and business account segregation with organized books of accounts.'
        }
      ]
    },
    {
      id: 'tax-gst',
      number: '02',
      title: 'TAX & GST',
      tagline: 'Tax preparation, return support and ongoing compliance.',
      icon: Receipt,
      services: [
        {
          name: 'GST registration & return support',
          description: 'Timely GSTR-1, GSTR-3B filings, annual returns, and state registration assistance.'
        },
        {
          name: 'Input tax credit reconciliation',
          description: 'Maximising ITC claims by cross-matching 2B/2A ledgers against purchase registers.'
        },
        {
          name: 'TDS support & tax compliance tracking',
          description: 'TDS calculations, challan generation, quarterly 24Q/26Q returns, and Form 16 issuance.'
        },
        {
          name: 'Income-tax return preparation',
          description: 'Accurate ITR filing for salaried, business, freelancers, and corporate entities.'
        }
      ]
    },
    {
      id: 'compliance-setup',
      number: '03',
      title: 'COMPLIANCE & BUSINESS SETUP',
      tagline: 'Entity filings, payroll, registrations and professional coordination.',
      icon: Building,
      services: [
        {
          name: 'Company, LLP & MCA/ROC compliance',
          description: 'Annual filings (AOC-4, MGT-7), director KYC, board resolutions, and statutory registers.'
        },
        {
          name: 'Payroll, payslips, full & final and PF/ESI support',
          description: 'End-to-end salary processing, structured payslips, FnF settlements, and labour welfare filings.'
        },
        {
          name: 'Udyam, IEC, FSSAI & business licences',
          description: 'Micro & SME registrations, import-export code, food safety licences, and local municipal permits.'
        },
        {
          name: 'Trademark search & application support',
          description: 'Brand trademark search, classification filing, and coordination for IP protection.'
        },
        {
          name: 'Financial documents, certificates & audit coordination',
          description: 'Turnover certificates, net worth declarations, and professional partner liaison.'
        },
        {
          name: 'Audit schedules & notice coordination',
          description: 'Tax audit readiness, statutory audit schedule preparation, and assessment notice handling.'
        }
      ]
    },
    {
      id: 'profitability-planning',
      number: '04',
      title: 'PROFITABILITY & FINANCIAL PLANNING',
      tagline: 'Turn business data into decisions, budgets and action plans.',
      icon: TrendingUp,
      services: [
        {
          name: 'Monthly MIS & management reports',
          description: 'Executive dashboards showing revenue drivers, cost centres, and working capital health.'
        },
        {
          name: 'Budget preparation & variance analysis',
          description: 'Detailed operating budgets matched against actuals to identify overspends and savings.'
        },
        {
          name: 'Cash-flow forecasts & expense monitoring',
          description: '13-week forward-looking rolling cash forecasts to ensure liquidity and working capital stability.'
        },
        {
          name: 'Profitability, KPI & trend dashboards',
          description: 'Unit economics, gross margin tracking, customer acquisition cost, and profitability analysis.'
        },
        {
          name: 'CMA data, projections & bank-loan financial packs',
          description: 'Credit Monitoring Arrangement packs, DSCR projections, and lender-ready financial dossiers.'
        }
      ]
    }
  ];

  // Filtering
  const filteredCategories = serviceCategories
    .filter(cat => activeFilter === 'all' || cat.id === activeFilter)
    .map(cat => ({
      ...cat,
      services: cat.services.filter(s => 
        searchTerm.trim() === '' || 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(cat => cat.services.length > 0);

  const handleServiceKeyDown = (event, category, serviceName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectService(category, serviceName);
    }
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="services-header-row">
          <div>
            <span className="section-tag">01 / SERVICES</span>
            <h2 className="section-heading">Complete support across your business journey.</h2>
            <p className="section-lead">
              Services are grouped by customer need so visitors can quickly find the right support. 
              Each service item links directly to our enquiry desk with tailored onboarding.
            </p>
          </div>

          {/* Quick Search */}
          <div className="service-search-box">
            <Search size={18} className="search-icon" />
            <label className="visually-hidden" htmlFor="service-search">Search services</label>
            <input 
              type="text" 
              id="service-search"
              placeholder="Search a service (e.g. GST, MIS, Payroll)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="service-search-input"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => setSearchTerm('')} 
                className="clear-search-btn"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="category-filter-bar" aria-label="Filter services by category">
          <button 
            type="button" 
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            aria-pressed={activeFilter === 'all'}
          >
            All Categories ({serviceCategories.reduce((acc, c) => acc + c.services.length, 0)})
          </button>
          {serviceCategories.map((cat) => (
            <button 
              key={cat.id}
              type="button" 
              className={`filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              {cat.title} ({cat.services.length})
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="services-categories-container">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="category-block">
                
                {/* Category Header */}
                <div className="category-block-header">
                  <div className="category-meta-left">
                    <div className="category-icon-box">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="category-num-tag">{cat.number} CATEGORY</div>
                      <h3 className="category-title">{cat.title}</h3>
                    </div>
                  </div>
                  <p className="category-tagline">{cat.tagline}</p>
                </div>

                {/* Service Cards Grid */}
                <div className="services-items-grid">
                  {cat.services.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="service-interactive-card"
                      onClick={() => onSelectService(cat.id, item.name)}
                      onKeyDown={(event) => handleServiceKeyDown(event, cat.id, item.name)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Enquire for ${item.name}`}
                    >
                      <div className="service-card-top">
                        <span className="service-bullet-mark">■</span>
                        <h4 className="service-item-name">{item.name}</h4>
                      </div>
                      <p className="service-item-desc">{item.description}</p>
                      
                      <div className="service-card-action">
                        <span className="action-text">Enquire for this service</span>
                        <ArrowRight size={14} className="action-arrow" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Scope Assurance Note */}
        <div className="services-footer-assurance">
          <div className="assurance-text">
            <strong>Need a combined scope?</strong> We structure custom recurring scopes incorporating bookkeeping, tax filings, and monthly MIS under one coordinated desk.
          </div>
          <button 
            type="button" 
            onClick={() => onSelectService('custom', 'Custom Multi-Service Advisory Scope')}
            className="btn btn-forest btn-sm"
          >
            <span>Request Custom Scope Review</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
