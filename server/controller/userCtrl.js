const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility function to validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Utility function to validate password
const isValidPassword = (password) => {
    return password.length >= 6;
};

const signUp = async (req, res) => {
    try {
        const { email, username, password, role = 'employee' } = req.body;

        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Validate password
        if (!isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email or username already exists'
            });
        }

        // Validate role
        const allowedRoles = ['employee', 'manager', 'admin'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role, // Use the provided role or default to 'employee'
            status: 'pending',
            isProfileComplete: false
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'Registration successful! Please complete your profile.'
        });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during registration'
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username })
            .select('+password') // Explicitly include password field
            .lean(); // Convert to plain JavaScript object

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if account is active
        if (user.status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated. Please contact admin.'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove sensitive data before sending response
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            user: userWithoutPassword,
            isProfileComplete: user.isProfileComplete
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming middleware sets this
        const updateData = req.body;

        // Validate required profile fields
        const requiredFields = [
            'name', 'designation', 'employeeID', 
            'department', 'phoneNumber', 'dateOfBirth', 'gender'
        ];

        const missingFields = requiredFields.filter(field => !updateData[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                ...updateData,
                isProfileComplete: true 
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('Profile update error:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating profile'
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming middleware sets this
        const user = await User.findById(userId)
            .select('-password')
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.error('Get profile error:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching profile'
        });
    }
};

module.exports = {
    signUp,
    login,
    updateProfile,
    getProfile
};
