const {Applications} = require('../models/dataModels');
const xlsx = require('xlsx');

const getAllApplications = async (req,res) => {
    console.log('getAllApplications endpoint hit!');
    try {
        const applications = await Applications.find({});
        res.status(200).json({ applications });    
    } catch (error){
        console.error(error);
        res.status(500).json({ sucess: false, message: 'Server Error'});
    }
}

const createNewApplication = async (req,res) => {
    console.log('createNewApplication endpoint hit!');
    console.log(req.body);
    const { CompanyName, AppliedDate, ApplicationStatus } = req.body;
    try {
        const application = await Applications.create({ CompanyName, AppliedDate, ApplicationStatus});
        res.status(200).json({ application });

    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error'});
    }


    console.log('access upload endpoint');
}

const uploadSpreadSheet = async (req, res) => {
    console.log('uploadSpreadSheet hit');

    // Check if file is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    try {
        // Accessing the uploaded file
        let file = req.files.myFile;
        const workbook = xlsx.read(file.data, { type: 'buffer' });

        // Assuming first sheet is the target sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        const applications = jsonData.map(row => {
            // Check if the 'Date Applied' value is a valid date
            let appliedDate = new Date(row['Date Applied']);
            if (isNaN(appliedDate)) {
                appliedDate = null; // Set to null if the date is invalid
            }

            return {
                CompanyName: row['Company Name'],
                AppliedDate: appliedDate,
                ApplicationStatus: row['Status']
            };
        });

        // Save to MongoDB
        await Applications.insertMany(applications);

        res.status(200).json({ success: true, message: 'Data uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createNewApplication,
    getAllApplications,
    uploadSpreadSheet
}