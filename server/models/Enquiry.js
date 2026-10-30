const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [8, 'Phone number is too short'],
    maxlength: [20, 'Phone number is too long']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: [
      'Individuals & Freelancers',
      'Proprietors & Partnerships',
      'Startups, LLPs & Companies',
      'SMEs & Manufacturers',
      'Other Business Entity'
    ]
  },
  serviceRequired: {
    type: String,
    required: [true, 'Service required must be selected'],
    trim: true
  },
  requirementDetails: {
    type: String,
    required: [true, 'Brief requirement or deadline is required'],
    trim: true,
    minlength: [10, 'Please provide at least a brief 10-character description of your requirement or deadline']
  },
  selectedPackage: {
    type: String,
    trim: true,
    default: 'Custom Advisory'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Proposal Sent', 'Onboarded', 'Closed'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
