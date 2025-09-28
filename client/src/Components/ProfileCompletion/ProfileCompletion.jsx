import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  MenuItem,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const steps = ['Basic Information', 'Work Details', 'Additional Information'];

const departments = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Operations',
  'Sales',
  'Research & Development',
  'Information Technology',
];

// const VisuallyHiddenInput = styled('input')`
//   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
//   height: 1px;
//   overflow: hidden;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   white-space: nowrap;
//   width: 1px;
// `;


const API_URL = process.env.REACT_APP_API_URL;

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    
    // Work Details
    employeeID: '',
    designation: '',
    department: '',
    joiningDate: '',
    
    // Additional Information
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Convert form data to JSON instead of FormData
      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // For debugging
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.clear();
          navigate('/login');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(responseData.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      
      // Update local storage with new user data if returned
      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'An error occurred while updating profile');
      if (err.message.includes('login again')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} textAlign="center">
              <input
                accept="image/*"
                type="file"
                id="profile-image-upload"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-image-upload">
                <Avatar
                  src={previewUrl}
                  sx={{ width: 100, height: 100, margin: 'auto', cursor: 'pointer' }}
                />
              </label>
              <Typography variant="caption" display="block">
                Click to upload profile picture
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Joining Date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Emergency Contact
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Name"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Relationship"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="emergencyContact.phoneNumber"
                value={formData.emergencyContact.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Complete Your Profile
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : activeStep === steps.length - 1 ? (
              'Complete Profile'
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileCompletion;


