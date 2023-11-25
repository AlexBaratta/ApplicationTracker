const express = require('express');
const mongoose = require('mongoose');
const applicationRoutes = require('./routes/applications')
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/api/applications', applicationRoutes);


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

