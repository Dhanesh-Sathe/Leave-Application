const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Registration fields
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

    // Profile fields
    name: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    employeeID: {
        type: String,
        unique: true,
        sparse: true
    },
    department: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String
    },
    joiningDate: {
        type: Date
    },
    profileImage: {
        type: String // URL or path to the image
    },
    role: {
        type: String,
        enum: ['employee', 'manager', 'admin'],
        default: 'employee'
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    },
    leaveBalance: {
        casual: {
            type: Number,
            default: 12
        },
        sick: {
            type: Number,
            default: 12
        },
        annual: {
            type: Number,
            default: 24
        }
    }
}, {
    timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1, username: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return this.name || this.username;
});

// Method to check if profile is complete
userSchema.methods.isProfileCompleted = function() {
    return !!(
        this.name &&
        this.designation &&
        this.employeeID &&
        this.department &&
        this.phoneNumber &&
        this.dateOfBirth &&
        this.gender
    );
};

// Pre-save middleware to update isProfileComplete
userSchema.pre('save', function(next) {
    this.isProfileComplete = this.isProfileCompleted();
    next();
});

module.exports = mongoose.model('User', userSchema);
