const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({message: 'Im working'});
});

module.exports = router;