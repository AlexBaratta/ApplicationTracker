const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get('https://github.com/SimplifyJobs/Summer2024-Internships');
        const $ = cheerio.load(data);
        const postings = [];

        // find the table after the specific table headers
        const table = $('thead').filter((i, el) => {
            return $(el).text().includes('Company') &&
                   $(el).text().includes('Role') &&
                   $(el).text().includes('Location') &&
                   $(el).text().includes('Date Posted') &&
                   $(el).text().includes('Application/Link');
        }).next('tbody');

        // iter over each row in the table body
        table.find('tr').each((i, elem) => {
            const tds = $(elem).find('td');
            if (tds.length > 0) {
                const company = $(tds[0]).find('strong').text().trim();
                const title = $(tds[1]).text().trim();
                const location = $(tds[2]).text().trim();
                const datePosted = $(tds[4]).text().trim();
                const applyLink = $(tds[3]).find('a').attr('href');
                postings.push({ company, title, location, datePosted, applyLink });
            }
        });

        res.json(postings);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
