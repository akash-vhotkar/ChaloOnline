const router = require('express').Router();

const Homecontroller = require('../controllers/user/Homecontroller');
const Authcontroller = require('../controllers/user/Authcontroler');


router.get('/', Homecontroller().indexpage);

//
router.post('/login', Authcontroller().login);
router.get('/register', Authcontroller().register);


module.exports = router;
