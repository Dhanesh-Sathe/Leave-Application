const express = require('express');
const router = express.Router();
const {
    reqLeave,
    approveLeave,
    getLeaveRequests,
    getLeaveStats,
    cancelLeave
} = require('../controller/leaveCtrl');
const { auth, authorize, requireCompleteProfile } = require('../middleware/auth');

// Apply leave - requires authentication and complete profile
router.post('/leave', 
    auth, 
    requireCompleteProfile, 
    reqLeave
);

// Approve/Reject leave - requires admin or manager role
router.put('/leave/:leaveId/status', 
    auth, 
    authorize('admin', 'manager'), 
    approveLeave
);

// Get leave requests with filters
router.get('/leaves', 
    auth, 
    getLeaveRequests
);

// Get leave statistics
router.get('/leaves/stats/:employeeId?', 
    auth, 
    getLeaveStats
);

// Cancel leave
router.put('/leave/:leaveId/cancel', 
    auth, 
    cancelLeave
);

// Get pending leave requests - admin/manager only
router.get('/leaves/pending', 
    auth, 
    authorize('admin', 'manager'),
    async (req, res) => {
        try {
            const leaves = await Leave.find({ status: 'Pending' })
                .populate('employee', 'name employeeID department')
                .sort({ createdAt: 1 });
            
            res.status(200).json({
                success: true,
                data: leaves
            });
        } catch (error) {
            console.error('Fetch pending leaves error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch pending leave requests'
            });
        }
    }
);

module.exports = router;
