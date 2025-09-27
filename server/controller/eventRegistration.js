const multer = require('multer');
const Event = require('../models/Event');

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const eventRegistration = async(req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.file: ', req.file);

    try{
        const{
            name, 
            email,
            department,
            year,
            mobile
        } = req.body;

        const user = await Event.findOne({name});

        if(user) 
            return res.status(400).json({msg: "You have already registered!!!"});

        // Check if file is present or not
        if(!req.files) {
            console.log("No file is uploaded.");
            return res.status(400).json({msg: "No file is uploaded."});
        }

        const newEvent = new Event({
            name, 
            email,
            department,
            year,
            mobile,
            receipt: {
                filename: req.files['receipt'][0].originalname,
                contentType: req.files['receipt'][0].mimetype,
                image: req.files['receipt'][0].buffer
            }

        });

        // Save the new event
        await newEvent.save();

        res.status(200).json({ message: 'Registration for event is successful!!!'});
    }
    catch(err){
        console.error('Error in registration.' , err);
        res.status(500).json({ message: 'An error occured while registring for event. ', error: err.message});
    }
}

module.exports = { upload, eventRegistration};