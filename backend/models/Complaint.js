const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please specify complaint type'],
    enum: [
      'Garbage & Waste',
      'Flooding',
      'Pollution',
      'Road Damage',
      'Street Lights',
      'Green Spaces',
      'Other'
    ]
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide a location']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  image: {
    type: String, // URL or file path
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  statusHistory: [{
    status: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    comment: String
  }],
  resolvedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate unique complaint ID
complaintSchema.pre('save', async function(next) {
  if (!this.complaintId) {
    this.complaintId = 'CMP' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Update resolvedAt when status changes to Resolved
complaintSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  next();
});

// Index for faster queries
complaintSchema.index({ complaintId: 1 });
complaintSchema.index({ user: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ type: 1 });
complaintSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Complaint', complaintSchema);
