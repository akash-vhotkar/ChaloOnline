const router = require('express').Router();

const Homecontroller = require('../controllers/user/Homecontroller');
const Authcontroller = require('../controllers/user/Authcontroler');
const Reffercontroller = require('../controllers/user/Reffercontroller');
const commonController = require('../controllers/user/commonController');
const activateAccController = require('../controllers/user/activateAccController');
const validatetoken = require('../middlewares/validateToken');

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

// add to tree
router.post('/addtotree', Reffercontroller().addtreecall);
router.post('/addAdmin', Reffercontroller().addAdmin);

// common controller
router.post('/getpayment', validatetoken, commonController().getPayment);
router.post('/verifypayment', validatetoken, commonController().verifypayment);


// activate account
router.post('/getUserInfo', validatetoken, activateAccController().getFullUserInfo);
router.post("/isprofilecomplete", validatetoken, activateAccController().isprofilecomplete);
// router.post("/addtransaction",validatetoken,activateAccController().addtra);


module.exports = router;
