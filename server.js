const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config')

const gitUsers = require('./routes/gitUsers');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require('./keys/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', gitUsers);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
