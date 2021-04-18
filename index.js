require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db')();

const Reffercontroller = require('./controllers/user/Reffercontroller');
const tree = require('./model/tree');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./routes/userApiRoute'));
app.use('/admin', require('./routes/adminApiRoute'));
app.get('/add', (req, res) => {
    const admin = {
        path: ["6105263500"],
        email: "admin$",
        name: "companyname",
        level: 1,
        userid: "6105263500",
        index: 1
    }
    tree.create(admin).then(alldata => {
        res.send('creted')
    }).catch(err => {
        if (err) console.log(err);
    })
})
app.post('/addnode', (req, res) => {
    console.log("thise function get called ");
    Reffercontroller().addtotree(req, res);

})
const PORT = process.env.PORT || 4000;


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Port listining at${PORT} `);
})

