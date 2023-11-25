const express = require('express');
const { createNewApplication, getAllApplications } = require('../controllers/applicationController')

const router = express.Router();

router.get('/', getAllApplications); //get all applications from DB
router.post('/upload', createNewApplication); //upload new application to DB

module.exports = router;