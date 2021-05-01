require('dotenv').config();
const express = require('express');
const cors = require('cors');
const payments = require('./controllers/user/Payement')
require('./config/db')();
const  id = "C039178637";
const sponsorid = "C099735487";
payments().getamount(id, sponsorid);

const tree = require('./model/tree');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./routes/userApiRoute'));
app.use('/admin', require('./routes/adminApiRoute'));

const PORT = process.env.PORT || 4000;


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Port listining at${PORT} `);
})

