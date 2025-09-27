const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Emergency Leave'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    phoneDuringLeave: { 
        type: String, 
        required: true,
        trim: true
    },
    backupPerson: {
        name: { 
            type: String,
            required: true,
            trim: true
        },
        contact: { 
            type: String,
            required: true,
            trim: true
        }
    },
    attachments: [{ 
        fileName: String,
        fileUrl: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    policyAcknowledged: { 
        type: Boolean, 
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending'
    },
    approvedBy: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        name: {
            type: String,
            default: null
        },
        designation: {
            type: String,
            default: null
        },
        approvedAt: {
            type: Date,
            default: null
        }
    },
    rejectionReason: {
        type: String,
        trim: true,
        default: null
    },
    cancellationReason: {
        type: String,
        trim: true,
        default: null
    },
    notificationsSent: {
        applicationSubmitted: {
            type: Boolean,
            default: false
        },
        statusUpdated: {
            type: Boolean,
            default: false
        },
        reminderSent: {
            type: Boolean,
            default: false
        }
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for faster queries
leaveSchema.index({ employee: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

// Virtual field for leave duration in days
leaveSchema.virtual('duration').get(function() {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
});

// Pre-save middleware to calculate number of days
leaveSchema.pre('save', function(next) {
    this.numberOfDays = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
    next();
});

// Method to check if leave can be cancelled
leaveSchema.methods.canBeCancelled = function() {
    return this.status === 'Pending' || 
           (this.status === 'Approved' && new Date() < this.startDate);
};

// Method to check if leave dates overlap with existing leaves
leaveSchema.statics.checkOverlap = async function(employeeId, startDate, endDate, excludeLeaveId = null) {
    const query = {
        employee: employeeId,
        status: { $in: ['Pending', 'Approved'] },
        $or: [
            { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
        ]
    };

    if (excludeLeaveId) {
        query._id = { $ne: excludeLeaveId };
    }

    return await this.findOne(query);
};

// Method to get leave statistics for an employee
leaveSchema.statics.getLeaveStats = async function(employeeId, year = new Date().getFullYear()) {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    return await this.aggregate([
        {
            $match: {
                employee: mongoose.Types.ObjectId(employeeId),
                startDate: { $gte: startOfYear, $lte: endOfYear }
            }
        },
        {
            $group: {
                _id: '$leaveType',
                count: { $sum: '$numberOfDays' },
                approved: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'Approved'] }, '$numberOfDays', 0]
                    }
                },
                pending: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'Pending'] }, '$numberOfDays', 0]
                    }
                },
                rejected: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'Rejected'] }, '$numberOfDays', 0]
                    }
                }
            }
        }
    ]);
};

module.exports = mongoose.model('Leave', leaveSchema);
