const express = require('express');
const router = express.Router();
const { 
    signUp, 
    login, 
    updateProfile, 
    getProfile,
} = require('../controller/userCtrl');
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/userModel');

// Authentication routes (public)
router.post('/signup', async (req, res) => {
    // Force role to be 'employee' for public signup
    req.body.role = 'employee';
    await signUp(req, res);
});

router.post('/login', login);

// Profile routes (protected)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, async (req, res) => {
    try {
        // Log for debugging
        console.log('Profile update request body:', req.body);
        console.log('User from token:', req.user);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            {
                ...req.body,
                isProfileComplete: true
            },
            { 
                new: true,
                runValidators: true 
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
});

// Admin routes (protected + role-based)
router.get('/users', 
    auth, 
    authorize('admin'), 
    async (req, res) => {
        try {
            const users = await User.find()
                .select('-password')
                .sort({ createdAt: -1 });
            
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Fetch users error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch users'
            });
        }
    }
);

// Update user status (admin only)
router.put('/users/:userId/status',
    auth,
    authorize('admin'),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const { status } = req.body;

            if (!['active', 'inactive', 'pending'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status value'
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { status },
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Update user status error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update user status'
            });
        }
    }
);

// Admin routes for creating users with specific roles
router.post('/admin/create-user', 
    auth, 
    authorize('admin'),
    signUp
);

// Admin route to update user role
router.put('/users/:userId/role',
    auth,
    authorize('admin'),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            if (!['employee', 'manager', 'admin'].includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role value'
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { role },
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Update user role error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update user role'
            });
        }
    }
);

// Get user by ID (admin and manager)
router.get('/users/:userId',
    auth,
    authorize('admin', 'manager'),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId)
                .select('-password')
                .lean();

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch user details'
            });
        }
    }
);

module.exports = router;
