const router = require('express').Router();

const Homecontroller = require('../controllers/user/Homecontroller');
const Authcontroller = require('../controllers/user/Authcontroler');
const Reffercontroller = require('../controllers/user/Reffercontroller');

const passswordgenerator = require('generate-password');
router.get('/', Homecontroller().indexpage);

// 
router.post('/login', Authcontroller().login);
router.post('/register', Authcontroller().register);
router.post('/getUserinfoByrefferid', Authcontroller().getUserinfoByrefferid);
router.post('/changePassword', Authcontroller().changePassword);
router.post('/getuserbyid', Authcontroller().getuserbyid);
router.post('/SendEmail', Authcontroller().SendEmail);
router.post('/forgotpass', Authcontroller().forgotpassword);
//
// router.post('/activateacc', Reffercontroller().addtotree);
router.post('/addnode', (req, res) => {
    const userid = passswordgenerator.generate();
    Reffercontroller().addtotree(req, res, req.body.sponsorid, userid, req.body.name, req.body.email)
})
router.get('/add', Reffercontroller().addrootnode)


module.exports = router;
