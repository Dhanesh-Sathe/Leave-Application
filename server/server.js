const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoute = require('./routes/userRoute');
const LeaveRoute = require('./routes/LeaveRoute');


require('dotenv').config();

// Middleware for Parsing JSON 
app.use(express.json());

// Enable cors
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoute);
app.use('/api', LeaveRoute);

// Connect ot Database
connectDB();

// Connect Port
app.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
})