const express = require('express');

const database = require('./db');
const User = require('./models/userModel');

const PORT = 3000

const app = express();

app.use(express.json());
app.use('/users', require('./routes/userRoute'));
app.use('/auth', require('./routes/authRoute'));

database.sync();

app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
})