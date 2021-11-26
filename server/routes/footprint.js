const express = require('express');
const fs = require('fs');

const router = express.Router();

// directory has to be relative to server.js which is calling this routes file
const footprintJSON = JSON.parse(fs.readFileSync('./data/food-footprints.json'));

router
    .get('/', (req, res) => {
        res.status(200)
            .json(footprintJSON)
    })

module.exports = router;