import React from 'react';
import { 
  ArrowUpRight, 
  Layers, 
  Package, 
  CheckSquare2, 
  HelpCircle,
  Palette
} from 'lucide-react';

export default function Overview({ onNavigate }) {
  const layoutItems = [
    {
      num: '01',
      title: 'Services',
      description: 'Four category groups with individual service links.',
      target: '#services',
      icon: Layers
    },
    {
      num: '02',
      title: 'Packages',
      description: 'Essential, Business, and MIS & Budgeting plans.',
      target: '#packages',
      icon: Package
    },
    {
      num: '03',
      title: 'Financial controls',
      description: 'Scope, task tracking, review, evidence and billing.',
      target: '#controls',
      icon: CheckSquare2
    },
    {
      num: '04',
      title: 'Contact & FAQs',
      description: 'Enquiry form layout, FAQs and service process.',
      target: '#contact',
      icon: HelpCircle
    }
  ];

  const brandSwatches = [
    { name: 'Forest Green', hex: '#123D2B', color: '#123D2B', text: '#F5F8F3' },
    { name: 'Profit Lime', hex: '#B8E04A', color: '#B8E04A', text: '#10271D' },
    { name: 'Clean White', hex: '#F5F8F3', color: '#F5F8F3', text: '#10271D', border: true },
    { name: 'Deep Green', hex: '#10271D', color: '#10271D', text: '#F5F8F3' },
  ];

  return (
    <section id="overview" className="section section-white overview-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-block">
          <span className="section-tag">WEBSITE LAYOUT AT A GLANCE</span>
          <h2 className="section-heading">A clean, growth-led service experience</h2>
        </div>

        {/* 4 Overview Grid Cards */}
        <div className="grid-4 overview-grid">
          {layoutItems.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.num} 
                href={item.target} 
                className="overview-card"
              >
                <div className="overview-card-top">
                  <span className="overview-card-num">{item.num}</span>
                  <ArrowUpRight size={18} className="overview-arrow" />
                </div>
                <h3 className="overview-card-title">{item.title}</h3>
                <p className="overview-card-desc">{item.description}</p>
              </a>
            );
          })}
        </div>

        {/* Client Brand Palette Spec Box */}
        <div className="brand-palette-strip">
          <div className="palette-info-label">
            <Palette size={16} />
            <span>Brand palette specifications:</span>
          </div>
          <div className="palette-swatches-group">
            {brandSwatches.map((swatch) => (
              <div key={swatch.hex} className="swatch-badge">
                <span 
                  className="swatch-circle" 
                  style={{ 
                    backgroundColor: swatch.color, 
                    border: swatch.border ? '1px solid #c2cdc6' : 'none' 
                  }}
                ></span>
                <span className="swatch-name">{swatch.name}</span>
                <span className="swatch-code">{swatch.hex}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
