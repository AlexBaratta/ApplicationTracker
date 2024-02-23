const express = require('express');
const { createNewApplication, getAllApplications, uploadSpreadSheet } = require('../controllers/applicationController')
const {Applications } = require('../models/dataModels');
const router = express.Router();

router.get('/', getAllApplications);
router.post('/uploadSpreadSheet', uploadSpreadSheet);


router.post('/', async (req, res) => {
    const { CompanyName, AppliedDate, ApplicationStatus } = req.body;
    const newApplication = new Applications({
        CompanyName,
        AppliedDate,
        ApplicationStatus
    });

    try {
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedApplication = await Applications.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        res.json(updatedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Applications.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Application' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;