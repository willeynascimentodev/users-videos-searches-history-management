const express = require('express');
require('dotenv').config();

const database = require('./db');
const User = require('./models/userModel');
const Search = require('./models/searchModel');

const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use('/users', require('./routes/userRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/', require('./routes/searchRoute'));

database.sync();

app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
})