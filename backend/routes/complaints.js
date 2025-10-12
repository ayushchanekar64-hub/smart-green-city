const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Complaint = require('../models/Complaint');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');

// @route   POST /api/complaints
// @desc    Create a new complaint
// @access  Private
router.post('/', protect, upload.single('image'), handleMulterError, [
  body('type').notEmpty().withMessage('Complaint type is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { type, title, description, location, latitude, longitude, priority } = req.body;

    // Parse location if it's a string
    let locationData = {
      address: typeof location === 'string' ? location : location.address
    };

    if (latitude && longitude) {
      locationData.coordinates = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
    }

    // Create complaint
    const complaint = await Complaint.create({
      user: req.user.id,
      type,
      title,
      description,
      location: locationData,
      image: req.file ? `/uploads/complaints/${req.file.filename}` : null,
      priority: priority || 'Medium',
      statusHistory: [{
        status: 'Pending',
        updatedBy: req.user.id,
        comment: 'Complaint submitted'
      }]
    });

    // Populate user details
    await complaint.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating complaint',
      error: error.message
    });
  }
});

// @route   GET /api/complaints
// @desc    Get all complaints (with filters)
// @access  Public (with optional auth for user-specific data)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { status, type, userId, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (userId) query.user = userId;

    // If regular user, only show their complaints
    if (req.user && req.user.role === 'citizen') {
      query.user = req.user.id;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const complaints = await Complaint.find(query)
      .populate('user', 'name email')
      .populate('assignedTo', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Complaint.countDocuments(query);

    res.json({
      success: true,
      count: complaints.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      complaints
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
});

// @route   GET /api/complaints/:id
// @desc    Get single complaint by ID or complaintId
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let complaint;

    // Check if it's MongoDB ObjectId or complaintId
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(req.params.id)
        .populate('user', 'name email phone')
        .populate('assignedTo', 'name email')
        .populate('statusHistory.updatedBy', 'name');
    } else {
      complaint = await Complaint.findOne({ complaintId: req.params.id.toUpperCase() })
        .populate('user', 'name email phone')
        .populate('assignedTo', 'name email')
        .populate('statusHistory.updatedBy', 'name');
    }

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      complaint
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaint',
      error: error.message
    });
  }
});

// @route   PUT /api/complaints/:id
// @desc    Update complaint
// @access  Private (Admin or complaint owner)
router.put('/:id', protect, async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check authorization
    if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this complaint'
      });
    }

    const { title, description, location, priority } = req.body;

    // Update fields
    if (title) complaint.title = title;
    if (description) complaint.description = description;
    if (location) complaint.location.address = location;
    if (priority) complaint.priority = priority;

    await complaint.save();

    res.json({
      success: true,
      message: 'Complaint updated successfully',
      complaint
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint',
      error: error.message
    });
  }
});

// @route   PUT /api/complaints/:id/status
// @desc    Update complaint status (Admin only)
// @access  Private (Admin)
router.put('/:id/status', protect, authorize('admin'), [
  body('status').isIn(['Pending', 'In Progress', 'Resolved', 'Rejected']).withMessage('Invalid status')
], async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { status, comment } = req.body;

    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Update status
    complaint.status = status;

    // Add to status history
    complaint.statusHistory.push({
      status,
      updatedBy: req.user.id,
      comment: comment || `Status changed to ${status}`
    });

    await complaint.save();
    await complaint.populate('user', 'name email');

    res.json({
      success: true,
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint status',
      error: error.message
    });
  }
});

// @route   DELETE /api/complaints/:id
// @desc    Delete complaint
// @access  Private (Admin or complaint owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check authorization
    if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this complaint'
      });
    }

    await complaint.deleteOne();

    res.json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting complaint',
      error: error.message
    });
  }
});

// @route   GET /api/complaints/stats/overview
// @desc    Get complaint statistics
// @access  Private (Admin)
router.get('/stats/overview', protect, authorize('admin'), async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const rejected = await Complaint.countDocuments({ status: 'Rejected' });

    // Get complaints by type
    const byType = await Complaint.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent complaints
    const recent = await Complaint.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'name email');

    res.json({
      success: true,
      stats: {
        total,
        pending,
        inProgress,
        resolved,
        rejected,
        resolutionRate: total > 0 ? ((resolved / total) * 100).toFixed(1) : 0,
        byType,
        recent
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;
