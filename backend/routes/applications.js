const express = require('express');
const {Applications} = require('../models/dataModels');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('access default endpoint');
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error'});
    }
    res.json({message: 'Im working'});
});

router.post('/upload', async (req,res) => {
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
})

module.exports = router;