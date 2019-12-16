const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/github/allUsers/:pageNumber', (req, res) => {
    let { pageNumber } = req.params;

    // https://api.github.com/search/users?q=+repos:%3E0+location:bangalore&page=1&per_page=10
    
    axios.get(`https://api.github.com/search/users?q=followers:%3E10+location:bangalore&page=${pageNumber}&per_page=10`)
    .then(result => {
        res.send(result.data);
    })
    .catch(err => {
        res.send(err);
    });
});

router.get('/github/user/:userName/:pageNumber', (req, res) => {
    let { userName, pageNumber } = req.params;

    // https://api.github.com/search/users?q=+repos:%3E0+location:bangalore&page=1&per_page=10

    axios.get(`https://api.github.com/search/users?q=${userName}+location:bangalore&page=${pageNumber}&per_page=10`)
    .then(result => {
        res.send(result.data);
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;