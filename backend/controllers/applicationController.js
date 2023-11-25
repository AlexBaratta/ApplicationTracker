const {Applications} = require('../models/dataModels');

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

module.exports = {
    createNewApplication,
    getAllApplications
};