import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';
import { auth, authDbDriver, isGoogleConfigured } from './auth.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finovara';

// CORS configuration supporting credentials for Better Auth cookies & sessions
const allowedOrigins = [
  'http://localhost:3055',
  'http://127.0.0.1:3055',
  'http://localhost:5000',
  'http://127.0.0.1:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true
}));

// 1. Mount Better Auth handler BEFORE body parsers!
// Better Auth reads raw request stream; body-parsing before this causes requests to hang.
app.all('/api/auth/*', toNodeHandler(auth));

// 2. Standard body parsers for enquiry APIs & general requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Persistent fallback storage path for client enquiries
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const enquiriesFilePath = path.join(dataDir, 'enquiries.json');
if (!fs.existsSync(enquiriesFilePath)) {
  fs.writeFileSync(enquiriesFilePath, JSON.stringify([], null, 2));
}

// Track Mongoose DB status
let isMongoConnected = false;

// Attempt Mongoose Connection for Enquiry model
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2500
}).then(() => {
  isMongoConnected = true;
  console.log('✅ Connected to MongoDB successfully for Enquiries:', MONGODB_URI);
}).catch((err) => {
  isMongoConnected = false;
  console.warn(`⚠️  MongoDB connection unavailable for Enquiries (${err.message}).`);
  console.log('🔄 Automatic fallback active: Saving enquiries persistently to server/data/enquiries.json');
});

// Helper to generate reference ID
function generateReferenceId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FNV-${timestamp}-${random}`;
}

// Helper for file-based fallback
function readFallbackEnquiries() {
  try {
    const raw = fs.readFileSync(enquiriesFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveFallbackEnquiry(enquiry) {
  const list = readFallbackEnquiries();
  list.unshift(enquiry);
  fs.writeFileSync(enquiriesFilePath, JSON.stringify(list, null, 2));
  return enquiry;
}

// Auth config / provider status endpoint
app.get('/api/auth-status', (req, res) => {
  res.json({
    engine: 'better-auth',
    emailPassword: true,
    emailVerificationRequired: false,
    googleAuth: isGoogleConfigured,
    authDatabase: authDbDriver
  });
});

// API Health Check
app.get('/api/health', async (req, res) => {
  let count = 0;
  if (isMongoConnected) {
    try {
      count = await Enquiry.countDocuments();
    } catch (e) {
      count = readFallbackEnquiries().length;
    }
  } else {
    count = readFallbackEnquiries().length;
  }

  res.json({
    status: 'online',
    firm: 'FINOVARA – Finance & Business Advisory',
    tagline: 'Clarity in your numbers. Confidence in your business.',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'Fallback Persistent Store (Active)',
    authDatabase: authDbDriver,
    googleAuthEnabled: isGoogleConfigured,
    enquiriesRecorded: count,
    timestamp: new Date().toISOString()
  });
});

// Service Catalog Route (Reflecting client document)
app.get('/api/services', (req, res) => {
  res.json({
    title: '01 / SERVICES — Complete support across your business journey.',
    description: 'Services are grouped by customer need so visitors can quickly find the right support.',
    categories: [
      {
        id: 'accounting',
        title: 'Accounting',
        tagline: 'Books, records and reconciliations for better financial control.',
        services: [
          'Accounting & bookkeeping',
          'Bank, ledger & payment gateway reconciliation',
          'Monthly closing & financial statements',
          'Individual, freelancer & proprietor accounts'
        ]
      },
      {
        id: 'tax-gst',
        title: 'Tax & GST',
        tagline: 'Tax preparation, return support and ongoing compliance.',
        services: [
          'GST registration & return support',
          'Input tax credit reconciliation',
          'TDS support & tax compliance tracking',
          'Income-tax return preparation'
        ]
      },
      {
        id: 'compliance-setup',
        title: 'Compliance & Business Setup',
        tagline: 'Entity filings, payroll, registrations and professional coordination.',
        services: [
          'Company, LLP & MCA/ROC compliance',
          'Payroll, payslips, full & final and PF/ESI support',
          'Udyam, IEC, FSSAI & business licences',
          'Trademark search & application support',
          'Financial documents, certificates & audit coordination',
          'Audit schedules & notice coordination'
        ]
      },
      {
        id: 'profitability-planning',
        title: 'Profitability & Financial Planning',
        tagline: 'Turn business data into decisions, budgets and action plans.',
        services: [
          'Monthly MIS & management reports',
          'Budget preparation & variance analysis',
          'Cash-flow forecasts & expense monitoring',
          'Profitability, KPI & trend dashboards',
          'CMA data, projections & bank-loan financial packs'
        ]
      }
    ]
  });
});

// Packages Catalog Route (Reflecting client document starting prices)
app.get('/api/packages', (req, res) => {
  res.json({
    title: '02 / PACKAGES & DELIVERY — Plans that fit your needs.',
    disclaimer: 'Indicative starting prices; final fees depend on transaction volume, entity type, registrations, payroll headcount, complexity and agreed deliverables.',
    packages: [
      {
        id: 'essential',
        name: 'Essential',
        startingPrice: '₹2,999',
        billingPeriod: 'per month onwards',
        recommended: false,
        features: [
          'Basic bookkeeping',
          'Bank reconciliation',
          'Income & expense summary',
          'Compliance reminders'
        ]
      },
      {
        id: 'business',
        name: 'Business',
        startingPrice: '₹7,999',
        billingPeriod: 'per month onwards',
        recommended: true,
        features: [
          'Bookkeeping & ledger review',
          'GST/TDS support',
          'Monthly P&L and balance sheet',
          'Receivables/payables tracking',
          'Compliance calendar'
        ]
      },
      {
        id: 'mis-budgeting',
        name: 'MIS & Budgeting',
        startingPrice: '₹14,999',
        billingPeriod: 'per month onwards',
        recommended: false,
        features: [
          'Monthly MIS reports',
          'Budget preparation',
          'Budget vs actual analysis',
          'Cash-flow forecast',
          'Profitability & KPI dashboards',
          'Management review pack'
        ]
      }
    ]
  });
});

// Submit Enquiry
app.post('/api/enquiries', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      businessType,
      serviceRequired,
      requirementDetails,
      selectedPackage
    } = req.body;

    // Strict validation
    if (!fullName || !phone || !email || !businessType || !serviceRequired || !requirementDetails) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required enquiry fields (Full name, phone, email, business type, service required, requirement / deadline).'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (requirementDetails.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a brief description of your requirement or deadline.'
      });
    }

    const referenceId = generateReferenceId();

    // Check if submitting user is authenticated via Better Auth
    let authenticatedUser = null;
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      if (session?.user) {
        authenticatedUser = session.user;
      }
    } catch {
      // Unauthenticated visitor enquiry
    }

    const enquiryData = {
      referenceId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      businessType: businessType.trim(),
      serviceRequired: serviceRequired.trim(),
      requirementDetails: requirementDetails.trim(),
      selectedPackage: selectedPackage || 'General Advisory',
      userId: authenticatedUser?.id || null,
      isClientAccount: Boolean(authenticatedUser),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    let savedItem;
    if (isMongoConnected) {
      try {
        const doc = new Enquiry(enquiryData);
        savedItem = await doc.save();
      } catch (dbErr) {
        console.warn('MongoDB save error, falling back to local storage:', dbErr.message);
        savedItem = saveFallbackEnquiry(enquiryData);
      }
    } else {
      savedItem = saveFallbackEnquiry(enquiryData);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for consulting FINOVARA. Your enquiry has been registered under our Coordinated Service Desk.',
      referenceId: referenceId,
      data: {
        referenceId: savedItem.referenceId,
        fullName: savedItem.fullName,
        email: savedItem.email,
        businessType: savedItem.businessType,
        serviceRequired: savedItem.serviceRequired,
        createdAt: savedItem.createdAt
      },
      nextStep: 'Stage 01: Understand — Our advisory desk will reach out within 1 business day to confirm entity details, scope and timeline.'
    });
  } catch (err) {
    console.error('Server error handling enquiry:', err);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your enquiry. Please try again or reach our desk directly.'
    });
  }
});

// Get Enquiries (For client verification and lead review)
app.get('/api/enquiries', async (req, res) => {
  try {
    let enquiries = [];
    if (isMongoConnected) {
      try {
        enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100);
      } catch (dbErr) {
        enquiries = readFallbackEnquiries();
      }
    } else {
      enquiries = readFallbackEnquiries();
    }
    res.json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve static frontend files from client/dist if available
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 FINOVARA Advisory API Server running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`🔒 Better Auth endpoints active under http://localhost:${PORT}/api/auth`);
});
