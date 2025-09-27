// const { image } = require('framer-motion/client');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String, 
        required: true
    },
    year: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required:true
    },
    receipt: {
        filename: String, 
        contentType: String,
        image: Buffer
    }
});

module.exports = mongoose.model('Event', eventSchema);