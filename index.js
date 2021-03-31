require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db')();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 1234;

app.use('/', require('./routes/userApiRoute'));
app.use('/admin', require('./routes/adminApiRoute'));


app.listen(PORT, () => {
    console.log(`Port listining at ${PORT}`);
})

