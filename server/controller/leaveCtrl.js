const Leave = require('../models/leaveModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

// Utility function to validate dates
const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    if (start > end) return { isValid: false, message: 'End date cannot be before start date' };
    if (start < today) return { isValid: false, message: 'Start date cannot be in the past' };
    return { isValid: true };
};

// Add this function to handle email notifications
const sendLeaveNotification = async (type, leave, user, manager = null) => {
    let emailData = {
        to: '',
        subject: '',
        text: ''
    };

    switch(type) {
        case 'APPLICATION_SUBMITTED':
            emailData = {
                to: manager.email,
                subject: 'New Leave Application',
                text: `A new leave application has been submitted by ${user.name} for ${leave.numberOfDays} days starting from ${leave.startDate}. Please review it in the dashboard.`
            };
            break;
        
        case 'APPLICATION_APPROVED':
            emailData = {
                to: user.email,
                subject: 'Leave Application Approved',
                text: `Your leave application for ${leave.numberOfDays} days starting from ${leave.startDate} has been approved.`
            };
            break;
            
        case 'APPLICATION_REJECTED':
            emailData = {
                to: user.email,
                subject: 'Leave Application Rejected',
                text: `Your leave application for ${leave.numberOfDays} days starting from ${leave.startDate} has been rejected. Reason: ${leave.rejectionReason}`
            };
            break;
    }

    await sendEmail(emailData);
};

const reqLeave = async (req, res) => {
    try {
        const {
            leaveType,
            startDate,
            endDate,
            reason,
            phoneDuringLeave,
            backupPerson,
            policyAcknowledged,
            attachments
        } = req.body;

        const employeeId = req.user.userId; // From auth middleware

        // Validate required fields
        if (!leaveType || !startDate || !endDate || !reason || !phoneDuringLeave || !backupPerson) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled"
            });
        }

        // Validate dates
        const dateValidation = validateDates(startDate, endDate);
        if (!dateValidation.isValid) {
            return res.status(400).json({
                success: false,
                message: dateValidation.message
            });
        }

        // Check for overlapping leaves
        const overlappingLeave = await Leave.checkOverlap(employeeId, startDate, endDate);
        if (overlappingLeave) {
            return res.status(400).json({
                success: false,
                message: "You already have a leave request for these dates"
            });
        }

        // Check leave balance
        const employee = await User.findById(employeeId);
        const leaveBalance = employee.leaveBalance[leaveType.toLowerCase()];
        if (leaveBalance <= 0) {
            return res.status(400).json({
                success: false,
                message: `Insufficient ${leaveType} balance`
            });
        }

        // Create new leave request
        const leave = new Leave({
            employee: employeeId,
            leaveType,
            startDate,
            endDate,
            reason,
            phoneDuringLeave,
            backupPerson,
            policyAcknowledged,
            attachments: attachments || [],
            status: 'Pending'
        });

        await leave.save();

        // After saving the leave request, notify the manager
        const manager = await User.findOne({ role: 'manager' }); // You might want to modify this based on your organization structure
        await sendLeaveNotification('APPLICATION_SUBMITTED', leave, req.user, manager);

        return res.status(201).json({
            success: true,
            message: "Leave request submitted successfully",
            data: leave
        });
    } catch (error) {
        console.error('Leave request error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit leave request"
        });
    }
};

const approveLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { action, remarks } = req.body;
        const approverId = req.user.userId;

        const leaveRequest = await Leave.findById(leaveId);
        if (!leaveRequest) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }

        const approver = await User.findById(approverId);
        if (!approver || !['admin', 'manager'].includes(approver.role)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to perform this action'
            });
        }

        // Update leave status
        leaveRequest.status = action;
        leaveRequest.approvedBy = {
            _id: approver._id,
            name: approver.name,
            designation: approver.designation,
            approvedAt: new Date()
        };

        if (action === 'Rejected') {
            leaveRequest.rejectionReason = remarks;
        }

        // Update leave balance if approved
        if (action === 'Approved') {
            const employee = await User.findById(leaveRequest.employee);
            const leaveType = leaveRequest.leaveType.toLowerCase();
            employee.leaveBalance[leaveType] -= leaveRequest.numberOfDays;
            await employee.save();
        }

        await leaveRequest.save();

        // Send notification based on action
        const employee = await User.findById(leaveRequest.employee);
        await sendLeaveNotification(
            action === 'Approved' ? 'APPLICATION_APPROVED' : 'APPLICATION_REJECTED',
            leaveRequest,
            employee
        );

        return res.status(200).json({
            success: true,
            message: `Leave request ${action.toLowerCase()} successfully`
        });
    } catch (error) {
        console.error('Leave approval error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to process leave request'
        });
    }
};

const getLeaveRequests = async (req, res) => {
    try {
        const { status, startDate, endDate, employeeId } = req.query;
        const query = {};

        // Build query based on filters
        if (status) query.status = status;
        if (employeeId) query.employee = employeeId;
        if (startDate && endDate) {
            query.startDate = { $gte: new Date(startDate) };
            query.endDate = { $lte: new Date(endDate) };
        }

        const leaves = await Leave.find(query)
            .populate('employee', 'name employeeID department')
            .populate('approvedBy._id', 'name designation')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: leaves
        });
    } catch (error) {
        console.error('Get leave requests error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch leave requests'
        });
    }
};

const getLeaveStats = async (req, res) => {
    try {
        const employeeId = req.params.employeeId || req.user.userId;
        const year = parseInt(req.query.year) || new Date().getFullYear();

        const stats = await Leave.getLeaveStats(employeeId, year);
        const employee = await User.findById(employeeId);

        return res.status(200).json({
            success: true,
            data: {
                stats,
                balance: employee.leaveBalance
            }
        });
    } catch (error) {
        console.error('Get leave stats error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch leave statistics'
        });
    }
};

const cancelLeave = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { reason } = req.body;
        const employeeId = req.user.userId;

        const leave = await Leave.findOne({
            _id: leaveId,
            employee: employeeId
        });

        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }

        if (!leave.canBeCancelled()) {
            return res.status(400).json({
                success: false,
                message: 'This leave request cannot be cancelled'
            });
        }

        leave.status = 'Cancelled';
        leave.cancellationReason = reason;

        // Restore leave balance if leave was approved
        if (leave.status === 'Approved') {
            const employee = await User.findById(employeeId);
            const leaveType = leave.leaveType.toLowerCase();
            employee.leaveBalance[leaveType] += leave.numberOfDays;
            await employee.save();
        }

        await leave.save();

        return res.status(200).json({
            success: true,
            message: 'Leave request cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel leave error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to cancel leave request'
        });
    }
};

module.exports = {
    reqLeave,
    approveLeave,
    getLeaveRequests,
    getLeaveStats,
    cancelLeave
};
