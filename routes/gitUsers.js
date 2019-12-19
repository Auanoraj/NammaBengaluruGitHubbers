const express = require('express');
const router = express.Router();
const axios = require('axios');

const headers = {
    // 'Authorization': 'token 23f8a775f16855596b7216589c2ebdb183cdac32',
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    "Content-Type": "application/json"
};

router.get('/github/allUsers/:pageNumber', (req, res) => {
    let { pageNumber } = req.params;

    // https://api.github.com/search/users?q=+repos:%3E0+location:bangalore&page=1&per_page=10
    // axios.get('https://api.github.com/rate_limit')
    //     .then(result => res.send(result.data))

    axios.get(`https://api.github.com/search/users?q=followers:%3E10+location:bangalore&page=${pageNumber}&per_page=10`)
    .then(async users => {

        const newArray = async () => {
            
            const mapped = await Promise.all(
                users.data.items.map(user => {
                    return new Promise((resolve, reject) => {
                    axios.get(`${user.url}?client_id=c8526d834e87170f8734&client_secret=41e25626724d618fa85bc3023bc6c7ef470ad8f8`)
                        .then(resp => resolve(resp.data))
                        .catch(err => reject(err))
                    })
                })
            );

            return mapped;
        }

        const newStructuredData = await newArray();

        res.send({ userData: newStructuredData, totalCount: users.data.total_count})
    })
    .catch(err => res.send(err));
});

router.get('/github/user/:userName/:pageNumber', (req, res) => {
    let { userName, pageNumber } = req.params;

    // https://api.github.com/search/users?q=+repos:%3E0+location:bangalore&page=1&per_page=10

    axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(userName)}+location:bangalore&page=${pageNumber}&per_page=10`)
    .then(async users => {
        const newArray = async () => {
            let mapped;

            await Promise.all(
                users.data.items.map(user => {
                    return new Promise((resolve, reject) => {
                    axios.get(`${user.url}?client_id=c8526d834e87170f8734&client_secret=41e25626724d618fa85bc3023bc6c7ef470ad8f8`)
                        .then(resp => resolve(resp.data))
                        .catch(err => reject(err))
                    })
                })
            )
            .then(res => mapped = res)
            .catch(err => console.log(err))

            return mapped;
        }

        const newStructuredData = await newArray();

        res.send({ userData: newStructuredData, totalCount: users.data.total_count})
    })
    .catch(err => res.send(err));
});

module.exports = router;