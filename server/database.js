const mongoose = require('mongoose');
const multer = require('multer');

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the schema for form data
const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    mobile: { type: String, required: true },
    receipt: { filename: String, contentType: String, image: Buffer }, // Store the image as binary data
});

// Create a model from the schema
const FormData = mongoose.model('FormData', formDataSchema);

// MongoDB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/event_registration', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Save form data to MongoDB
const saveFormData = async (data) => {
    try {

        // Check if files are present
        if (!req.files) {
            console.log('No files uploaded');
            return res.status(400).json({ message: 'No files were uploaded' });
        }

        
        const formData = new FormData(data);
        await formData.save();
        console.log('Form data saved:', formData);
    } catch (error) {
        console.error('Error saving form data:', error);
    }
};

module.exports = { connectToDatabase, saveFormData };
