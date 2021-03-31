const router = require('express').Router();

const Homecontroller = require('../controllers/user/Homecontroller');
const Authcontroller = require('../controllers/user/Authcontroler');


router.get('/', Homecontroller().indexpage);

//
router.post('/login', Authcontroller().login);
router.post('/register', Authcontroller().register);
router.post('/getUserinfoByrefferid', Authcontroller().getUserinfoByrefferid);
router.post('/changePassword', Authcontroller().changePassword);
router.post('/SendEmail', Authcontroller().SendEmail);
router.post('/forgotpass', Authcontroller().forgotpassword);


module.exports = router;
