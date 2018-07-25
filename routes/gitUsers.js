const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

router.get('/github/result', (req, res) => {
    axios.get('https://api.github.com/search/users?q=+repos:%3E0+location:bangalore&page=1&per_page=10')
    .then(result => {
        res.send(result.data.items);
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;