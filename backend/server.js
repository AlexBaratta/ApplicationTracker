const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const applicationRoutes = require('./routes/applications')
const jobPostingsRoutes = require('./routes/jobPostings');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/api/applications', applicationRoutes);
app.use('/api/job-postings', jobPostingsRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Only start the server once connected to MongoDB
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db, listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

