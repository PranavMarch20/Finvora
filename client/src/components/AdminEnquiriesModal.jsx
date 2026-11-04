import React, { useState, useEffect } from 'react';
import { 
  X, 
  Inbox, 
  RefreshCw, 
  Search, 
  CheckCircle2,
  Database
} from 'lucide-react';
import useDialog from '../useDialog';

export default function AdminEnquiriesModal({ isOpen, onClose }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const [resEnq, resHealth] = await Promise.all([
        fetch('/api/enquiries'),
        fetch('/api/health')
      ]);

      if (resEnq.ok) {
        const data = await resEnq.json();
        setEnquiries(data.enquiries || []);
      }
      if (resHealth.ok) {
        const health = await resHealth.json();
        setDbStatus(health.database || 'Active');
      }
    } catch (err) {
      console.error('Error fetching admin enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnquiries();
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedEnquiry(null);
    onClose();
  };

  const dialogRef = useDialog(isOpen, handleClose);

  if (!isOpen) return null;

  const filtered = enquiries.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.referenceId?.toLowerCase().includes(q) ||
      item.fullName?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.businessType?.toLowerCase().includes(q) ||
      item.serviceRequired?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        ref={dialogRef}
        className="modal-container admin-drawer-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiries-dialog-title"
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="admin-inbox-badge">
              <Inbox size={20} />
            </div>
            <div>
              <h3 id="enquiries-dialog-title" className="modal-title">Coordinated Service Desk — Incoming Enquiries</h3>
              <div className="db-indicator-row">
                <Database size={13} />
                <span>Backend Storage: <strong>{dbStatus || 'Connected'}</strong></span>
                <span className="count-pill">{enquiries.length} Record{enquiries.length === 1 ? '' : 's'}</span>
              </div>
            </div>
          </div>

          <div className="modal-actions-right">
            <button 
              type="button" 
              onClick={fetchEnquiries} 
              className="btn-icon-action" 
              title="Refresh records"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'spin-anim' : ''} />
            </button>
            <button 
              type="button" 
              onClick={handleClose}
              className="btn-close-modal"
              aria-label="Close dialog"
              data-dialog-autofocus
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body admin-drawer-body">
          
          <div className="admin-controls-strip">
            <div className="search-wrap">
              <Search size={16} />
              <label className="visually-hidden" htmlFor="enquiry-search">Search enquiries</label>
              <input 
                type="text" 
                id="enquiry-search"
                placeholder="Search by reference ID, name, email or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
          </div>

          {loading && enquiries.length === 0 ? (
            <div className="admin-empty-state">
              <RefreshCw size={28} className="spin-anim mb-3" />
              <p>Fetching records from service desk backend...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <Inbox size={36} className="empty-icon" />
              <h4>No enquiries found</h4>
              <p>Submit a consultation request through the website form to see it appear here.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-enquiries-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Client Name</th>
                    <th>Contact Info</th>
                    <th>Business Type</th>
                    <th>Service Required</th>
                    <th>Received At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.referenceId || item._id}>
                      <td>
                        <span className="ref-id-badge">{item.referenceId}</span>
                      </td>
                      <td>
                        <div className="client-name-bold">{item.fullName}</div>
                      </td>
                      <td>
                        <div className="contact-col">
                          <span className="email-link">{item.email}</span>
                          <span className="phone-sub">{item.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="entity-badge">{item.businessType}</span>
                      </td>
                      <td>
                        <div className="service-name-cell">{item.serviceRequired}</div>
                        {item.selectedPackage && (
                          <span className="pkg-tag-mini">{item.selectedPackage}</span>
                        )}
                      </td>
                      <td>
                        <span className="time-badge">
                          {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          onClick={() => setSelectedEnquiry(item)}
                          className="btn btn-outline-dark btn-sm"
                        >
                          View Brief
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Detailed Item View Modal Sub-overlay */}
          {selectedEnquiry && (
            <div className="enquiry-detail-overlay" role="dialog" aria-modal="true" aria-label="Enquiry details">
              <div className="enquiry-detail-card animate-fade-in">
                <div className="detail-card-head">
                  <div>
                    <span className="detail-ref-label">ENQUIRY RECORD</span>
                    <h4>{selectedEnquiry.referenceId}</h4>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSelectedEnquiry(null)}
                    className="btn-close-sub"
                    aria-label="Close enquiry details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="detail-meta-grid">
                  <div>
                    <label>Full Name</label>
                    <p>{selectedEnquiry.fullName}</p>
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <p>{selectedEnquiry.phone}</p>
                  </div>
                  <div>
                    <label>Email Address</label>
                    <p>{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <label>Business Classification</label>
                    <p>{selectedEnquiry.businessType}</p>
                  </div>
                  <div>
                    <label>Service Priority</label>
                    <p>{selectedEnquiry.serviceRequired}</p>
                  </div>
                  <div>
                    <label>Selected Package</label>
                    <p>{selectedEnquiry.selectedPackage || 'Custom Advisory'}</p>
                  </div>
                </div>

                <div className="detail-requirement-block">
                  <label>Client's Brief Requirement / Deadline:</label>
                  <div className="requirement-box-content">
                    {selectedEnquiry.requirementDetails}
                  </div>
                </div>

                <div className="detail-footer-row">
                  <span className="registered-time">
                    Logged: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setSelectedEnquiry(null)}
                    className="btn btn-forest btn-sm"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="footer-left-info">
            <CheckCircle2 size={16} />
            <span>FINOVARA Coordinated Service Desk • Secure MERN Storage</span>
          </div>
          <button type="button" onClick={handleClose} className="btn btn-forest btn-sm">
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
}
