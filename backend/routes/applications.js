const express = require('express');
const { createNewApplication, getAllApplications, uploadSpreadSheet } = require('../controllers/applicationController')

const router = express.Router();

router.get('/', getAllApplications); //get all applications from DB
router.post('/upload', createNewApplication); //upload new application to DB
router.post('/uploadSpreadSheet', uploadSpreadSheet); //upload spreadsheet data

module.exports = router;